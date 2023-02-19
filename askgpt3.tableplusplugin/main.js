'use strict';

import { generateQuery, formatSQL, sleep } from './library/helper';

var creation = function(context) {
    var build = parseInt(Application.appBuild(), 10);
    var platform = Application.platform();
    if (build < 330 && platform == "macOS") {
        context.alert("Warning", "Please update TablePlus to the build 330 or newer.");
        return;
    };
    if (build < 138 && platform == "Windows") {
        context.alert("Warning", "Please update TablePlus to the build 138 or newer.");
        return;
    };

    var workingPath = Application.pluginRootPath() + "/com.hormold.askgpt3.tableplusplugin/ui/index.html"
    var webView = context.loadFile(workingPath, null);

    // Disable menu context
    webView.evaluate("document.body.setAttribute('oncontextmenu', 'event.preventDefault();');");

    // This function is not working, because the sandbox not allow to access settimeout/setinterval functions
    const checkQueryToRun = async function () {
        webView.evaluate("getQueryToRun()", function (result) {
            if (result) {
                const queryEditor = context.currentQueryEditor();
                if (!queryEditor)
                    return;//context.alert('Error', 'Please open a query editor to insert the query.');
                const range = queryEditor.currentSelectedRange();
                queryEditor.replaceStringInRange(formatSQL(result), range);
            }
        });
        await sleep(1000);
        checkQueryToRun();
    };
    
    let item = context.clickedItem();
    generateQuery(context, item, webView, function () {
        checkQueryToRun();
    });
};


global.creation = creation;
