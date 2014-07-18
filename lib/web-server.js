#!/usr/bin/env node

// Modules
var connect = require('connect'),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
    serveStatic = require('serve-static'),
    serveIndex = require('serve-index');

// Variables
var app = connect(),
    hookFile = 'web-server-hook.js';

function main(port, rootPath, indexFile) {
    var hook = {
        config: function() {},
        postConfig: function() {}
    };

    rootPath = path.resolve(rootPath);

    if (fs.existsSync(path.resolve(hookFile))) {
        hook = require('./' + hookFile);
    }

    if (undefined !== hook.config) {
        hook.config(app, port, rootPath);
    }

    app.use(serveStatic(rootPath, {'index': [indexFile]}));
    app.use(serveIndex(rootPath, {'icons': true, 'view': 'details'}));

    if (undefined !== hook.postConfig) {
        hook.postConfig(app, port, rootPath);
    }

    if (undefined != hook.createServer) {
        hook.createServer(app, port, rootPath);
    } else {
        http.createServer(app).listen(port, function() {
            console.log('Static server started at http://localhost:%d/', port);
        });
    }
}

module.exports = main;
