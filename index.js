#!/usr/bin/env node
require('dotenv').config();

const output = require('./dist/output');

const argv =
  require('yargs')
    .version()
    .env('ETOMUSUME')
    .option('verbose', {
      alias: 'v',
      describe: 'Would you like it noisy, Sir?'
    })
    .option('video-id', {
      alias: 'i',
      describe: 'Source video ID',
    })
    .option('twitch-client-id', {
      describe: 'Twitch API client ID',
    })
    .option('destination', {
      alias: 'd',
      default: 'stdout',
      choices: Object.keys(output),
      describe: 'Where to redirect output to. Defaults to `stdout`',
    })
    .option('print0', {
      alias: '0',
      describe: 'Use null character as delimiter for items',
    })
    .demandOption([
      'video-id',
      'twitch-client-id',
    ])
    .argv;

require('./dist/index').default(argv);
