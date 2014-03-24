#!/usr/bin/env node

'use strict';

var program = require('commander');

program
    .version('1.0.1')
    .option('-p, --port [port]', 'Server Port (Defaults to 8000)')
    .option('-r, --root [root]', 'Server Root (Defaults to ./)')
    .parse(process.argv);

process.title = 'web-server';

require('../lib/web-server')(program.port || 8000, program.root || './');