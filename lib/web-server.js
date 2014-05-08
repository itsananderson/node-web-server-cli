#!/usr/bin/env node

// Modules
var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    path = require('path');

// Variables
var app = express(),
    hookFile = 'web-server-hook.js';

function main(port, rootPath, indexFile) {
    var hook = {
        config: function() {},
        postConfig: function() {}
    };

    rootPath = path.resolve(rootPath);

    app.set('port', port || process.env.PORT);

    if (fs.existsSync(path.resolve(hookFile))) {
        hook = require(hookFile);
    }

    if (undefined !== hook.config) {
        hook.config(app, port, rootPath);
    }

    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.methodOverride());
    app.use(express.query());
    app.use(express.static(rootPath, {'index': [indexFile]}));
    app.use(express.directory(rootPath, {'icons': true, 'view': 'details'}));

    if (undefined !== hook.postConfig) {
        hook.postConfig(app, port, rootPath);
    }

    if (undefined != hook.createServer) {
        hook.createServer(app, port, rootPath);
    } else {
        http.createServer(app).listen(app.get('port'), function() {
            console.log('Static server started at http://localhost:' + app.get('port') + '/');
        });
    }
}

module.exports = main;
