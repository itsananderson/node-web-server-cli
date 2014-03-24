#!/usr/bin/env node

// Modules
var events = require('events'),
    express = require('express'),
    fs = require('fs'),
    http = require('http'),
    util = require('util'),
    path = require('path'),
    url = require('url');

// Variables
var app = express(),
    hookFile = 'web-server-hook.js';

function main(port, rootPath) {

    rootPath = path.resolve(rootPath);

    app.set('port', port || process.env.PORT);

    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.methodOverride());
    app.use(express.query());
    app.use(express.directory(rootPath, {'icons': true, 'view': 'details'}));
    app.use(express.static(rootPath));

    if (fs.existsSync(path.resolve(hookFile))) {
        var hook = require(hookFile);
        hook.config(app, port);
    }

    http.createServer(app).listen(app.get('port'), function() {
        console.log('Static server started at http://localhost:' + app.get('port') + '/');
    });
}

module.exports = main;
