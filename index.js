#!/usr/bin/env node
require('dotenv').config();

const output = require('./dist/output');

const argv =
  require('yargs')
    .version()
    .env('ETOMUSUME')
    .command(require('./dist/command/sub'))
    .command(require('./dist/command/vod'))
    .option('verbose', {
      alias: 'v',
      describe: 'Would you like it noisy, Sir?'
    })
    .option('print0', {
      alias: '0',
      describe: 'Use null character as delimiter for items',
    })
    .argv;

// require('./dist/index').default(argv);
