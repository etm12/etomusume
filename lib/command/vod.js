import * as output from '../output';
import Twitch from '../twitch';

export const command = 'vod <videoId>';

export const describe = 'Scrape Twitch VOD chat';

export const builder = yargs => yargs
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
  .demandOption([
    'video-id',
    'twitch-client-id',
  ]);

export const handler = argv => {
  const videoId = argv['video-id'];
  const clientId = argv['twitch-client-id'];

  const res = Twitch(clientId, videoId);

  const onValueFn = output[argv['destination']];

  res.onValue(onValueFn(argv));
}
