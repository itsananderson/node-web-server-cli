#!/usr/bin/env node

'use strict';

var program = require('commander');

program
    .version('0.2.0')
    .option('-p, --port [port]', 'Server Port (Defaults to 8000)')
    .option('-r, --root [root]', 'Server Root (Defaults to ./)')
    .option('-i, --index [index]', 'Index file (Defaults to index.html)')
    .parse(process.argv);

process.title = 'web-server';

require('../lib/web-server')(program.port || 8000, program.root || './', program.index || 'index.html');
