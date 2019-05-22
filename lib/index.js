const output = require('./output');
const Twitch = require('./twitch');

function main(argv) {
  const videoId = argv['video-id'];
  const clientId = argv['twitch-client-id'];

  console.log({ videoId, clientId });

  const res = Twitch(clientId, videoId);

  let outputFn = output[argv.destination] || (a => a);

  res
    .onValue(outputFn);
}

module.exports = main;
