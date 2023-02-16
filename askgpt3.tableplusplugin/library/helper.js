"use strict";

function generateQuery(context, item, webView) {
  let driver = context.driver();
  let query, query2;
  let comments = {};

  switch (driver) {
    case "MySQL":
    case "MariaDB":
      query = `SELECT table_name, ordinal_position as ordinal_position,column_name as column_name,column_type AS data_type,is_nullable as is_nullable,column_default as column_default,extra as extra,column_name AS foreign_key,column_comment AS comment FROM information_schema.columns WHERE table_schema='${item.schema()}';`;
      break;
    case "PostgreSQL":
      query = `SELECT table_schema, table_name, ordinal_position,column_name,udt_name AS data_type,numeric_precision,datetime_precision,numeric_scale,character_maximum_length AS data_length,is_nullable,column_name as check,column_name as check_constraint,column_default,column_name AS foreign_key,pg_catalog.col_description(16402,ordinal_position) as comment FROM information_schema.columns WHERE table_schema='${item.schema()}';`;
      query2 = `select c.table_schema, c.table_name,  c.column_name, pgd.description from pg_catalog.pg_statio_all_tables as st inner join pg_catalog.pg_description pgd on (pgd.objoid = st.relid) inner join information_schema.columns c on (pgd.objsubid   = c.ordinal_position and c.table_schema = st.schemaname and c.table_name   = st.relname);`;
      break;
    default:
      context.alert("Error", driver + " is not supported");
      return;
  }

  const processData = (rows, commentRows) => {
    
    if(commentRows) {
      commentRows.forEach(row => {
        const hash = `${row.raw("table_schema")}.${row.raw("table_name")}.${row.raw("column_name")}`;
        comments[hash] = row.raw("description");
      });
    }
    rows.sort((l, r) => {
      return (
        parseInt(l.raw("ordinal_position")) >
        parseInt(r.raw("ordinal_position"))
      );
    });

    const groupByTable = {};
    for(let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const tableName = row.raw("table_name");
      const hash = `${row.raw("table_schema")}.${row.raw("table_name")}.${row.raw("column_name")}`;
      if (!groupByTable[tableName]) {
        groupByTable[tableName] = [];
      }
      groupByTable[tableName].push({
          'name': row.raw("column_name"),
          'type': row.raw("data_type"),
          'comment': row.raw("comment") || comments[hash] || "",
          "selected": true
      });
    }
    const data = JSON.stringify(groupByTable).replace(/'/g, "\\'");
    
    webView.evaluate("setTimeout( () => { EventEmitter.emit('inject_driver','"+driver+"');}, 600);");
    webView.evaluate("setTimeout( () => { EventEmitter.emit('inject_prompt', '"+data+"');}, 700);"); 
    SystemService.notify(
        "Generator",
        "Ready to use"
    );
  }

  if(query2) {
    context.execute(query2, res2 => {
      context.execute(query, res => {
        processData(res.rows, res2.rows)
      });
    });
  } else {
    context.execute(query, res => {
      processData(res.rows)
    });
  }

  
}



export {
  generateQuery
};