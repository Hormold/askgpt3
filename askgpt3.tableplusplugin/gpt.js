!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";function a(e,t,n){let a,o,r=e.driver(),i={};switch(r){case"MySQL":case"MariaDB":a=`SELECT table_name, ordinal_position as ordinal_position,column_name as column_name,column_type AS data_type,is_nullable as is_nullable,column_default as column_default,extra as extra,column_name AS foreign_key,column_comment AS comment FROM information_schema.columns WHERE table_schema='${t.schema()}';`;break;case"PostgreSQL":a=`SELECT table_schema, table_name, ordinal_position,column_name,udt_name AS data_type,numeric_precision,datetime_precision,numeric_scale,character_maximum_length AS data_length,is_nullable,column_name as check,column_name as check_constraint,column_default,column_name AS foreign_key,pg_catalog.col_description(16402,ordinal_position) as comment FROM information_schema.columns WHERE table_schema='${t.schema()}';`,o="select c.table_schema, c.table_name,  c.column_name, pgd.description from pg_catalog.pg_statio_all_tables as st inner join pg_catalog.pg_description pgd on (pgd.objoid = st.relid) inner join information_schema.columns c on (pgd.objsubid   = c.ordinal_position and c.table_schema = st.schemaname and c.table_name   = st.relname);";break;default:return void e.alert("Error",r+" is not supported")}const l=(e,t)=>{t&&t.forEach(e=>{const t=`${e.raw("table_schema")}.${e.raw("table_name")}.${e.raw("column_name")}`;i[t]=e.raw("description")}),e.sort((e,t)=>parseInt(e.raw("ordinal_position"))>parseInt(t.raw("ordinal_position")));const a={};for(let t=0;t<e.length;t++){const n=e[t],o=n.raw("table_name"),r=`${n.raw("table_schema")}.${n.raw("table_name")}.${n.raw("column_name")}`;a[o]||(a[o]=[]),a[o].push({name:n.raw("column_name"),type:n.raw("data_type"),comment:n.raw("comment")||i[r]||"",selected:!0})}let o=JSON.stringify(a);o=o.replace(/'/g,"\\'"),n.evaluate("setTimeout( () => { EventEmitter.emit('inject_driver','"+r+"');}, 1000);"),n.evaluate("setTimeout( () => { EventEmitter.emit('inject_prompt', '"+o+"');}, 1000);"),SystemService.notify("Generator","Ready to use")};o?e.execute(o,t=>{e.execute(a,e=>{l(e.rows,t.rows)})}):e.execute(a,e=>{l(e.rows)})}n.d(t,"a",(function(){return a}))},function(e,t,n){"use strict";n.r(t),function(e){var t=n(0);e.creation=function(e){var n=parseInt(Application.appBuild(),10),a=Application.platform();if(n<330&&"macOS"==a)return void e.alert("Warning","Please update TablePlus to the build 330 or newer.");if(n<138&&"Windows"==a)return void e.alert("Warning","Please update TablePlus to the build 138 or newer.");var o=Application.pluginRootPath()+"/com.hormold.gptsqltalk.tableplusplugin/ui/index.html",r=e.loadFile(o,null);r.evaluate("document.body.setAttribute('oncontextmenu', 'event.preventDefault();');");let i=e.clickedItem();Object(t.a)(e,i,r)}}.call(this,n(2))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n}]);