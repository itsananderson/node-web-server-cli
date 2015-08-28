#!/usr/bin/env node

"use strict";

var program = require('commander'),
    pkg = require('../package.json');

program
    .version(pkg.version)
    .option('-p, --port [port]', 'Server Port (Defaults to 8000)', 8000)
    .option('-r, --root [root]', 'Server Root (Defaults to current directory)', './')
    .option('-i, --index <index>', 'Index file (Defaults to index.html)', 'index.html')
    .option('-h, --hidden', 'Show hidden files', false)
    .option('-I, --disable-index', "Disable index files", false)
    .parse(process.argv);

process.title = 'web-server';

var index;
if (program.disableIndex) {
    index = [];
} else {
    index = program.index.split(",");
}

require('../lib/web-server')({
    port: program.port,
    rootPath: program.root,
    indexFiles: index,
    showHidden: program.hidden
});
