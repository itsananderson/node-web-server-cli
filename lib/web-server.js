// Modules
var connect = require('connect'),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
    serveStatic = require('serve-static'),
    serveIndex = require('serve-index');

function webServer(config) {

    var port = config.port,
        rootPath = config.rootPath,
        indexFiles = config.indexFiles,
        showHidden = config.showHidden,
        callback = config.callback;

    rootPath = path.resolve(rootPath);
    port = parseInt(port);
    showHidden = !!showHidden;
    indexFiles = typeof indexFiles === "string" ? [indexFiles] : indexFiles;

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

    var serveStaticConfig = {
        index: indexFiles
    };

    var serveIndexConfig = {
        icons: true,
        view: 'details'
    };

    if (showHidden) {
        serveStaticConfig.dotfiles = 'allow';
        serveIndexConfig.hidden = true;
    }

    app.use(serveStatic(rootPath, serveStaticConfig));
    app.use(serveIndex(rootPath, serveIndexConfig));

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
        if (callback) {
            callback(server);
        }
    });
}

module.exports = webServer;
