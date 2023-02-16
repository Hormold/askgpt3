'use strict';

import { generateQuery } from './library/helper';


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
    
    let item = context.clickedItem();
    generateQuery(context, item, webView);
};


global.creation = creation;
