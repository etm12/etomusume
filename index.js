#!/usr/bin/env node
require('dotenv').config();

const argv =
  require('yargs')
    .version()
    .env('ETOMUSUME')
    .option('verbose', {
      alias: 'v',
    })
    .option('video-id', {
      alias: 'i',
    })
    .option('twitch-client-id', {
      alias: 'c',
    })
    .option('destination', {
      alias: 'd',
      default: 'stdout',
    })
    .demandOption([
      'video-id',
      'twitch-client-id',
    ])
    .argv;

require('./lib/index')(argv);
