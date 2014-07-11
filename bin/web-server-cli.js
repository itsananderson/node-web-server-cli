#!/usr/bin/env node

'use strict';

var program = require('commander'),
    pkg = require('../package.json');

program
    .version(pkg.version)
    .option('-p, --port [port]', 'Server Port (Defaults to 8000)')
    .option('-r, --root [root]', 'Server Root (Defaults to ./)')
    .option('-i, --index [index]', 'Index file (Defaults to index.html)')
    .parse(process.argv);

process.title = 'web-server';

require('../lib/web-server')(program.port || process.env.PORT || 8000, program.root || './', program.index || 'index.html');
