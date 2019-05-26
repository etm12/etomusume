const output = require('./output');
const Twitch = require('./twitch');

function main(argv) {
  const videoId = argv['video-id'];
  const clientId = argv['twitch-client-id'];

  const res = Twitch(clientId, videoId);

  const onValueFn = output[argv['destination']];

  res.onValue(onValueFn(argv));
}

module.exports = main;
