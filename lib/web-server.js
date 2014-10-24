#!/usr/bin/env node

// Modules
var connect = require('connect'),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
    serveStatic = require('serve-static'),
    serveIndex = require('serve-index');

function main(port, rootPath, indexFile) {

    rootPath = path.resolve(rootPath);
    port = parseInt(port);

    var app = connect(),
    hookFile = path.join(rootPath, 'web-server-hook.js');
    hook = {
        config: function() {},
        postConfig: function() {}
    };

    if (fs.existsSync(hookFile)) {
        hook = require(hookFile);
    }

    if (undefined !== hook.config) {
        hook.config(app, port, rootPath);
    }

    app.use(serveStatic(rootPath, {'index': [indexFile]}));
    app.use(serveIndex(rootPath, {'icons': true, 'view': 'details'}));

    if (undefined !== hook.postConfig) {
        hook.postConfig(app, port, rootPath);
    }

    var server;
    if (hook.createServer) {
        server = hook.createServer(app, port, rootPath);
    } else {
        server = http.createServer(app);
    }

    server.listen(port, function() {
        console.log('Static server started at http://localhost:%d/', server.address().port);
    });

    return server;
}

module.exports = main;
