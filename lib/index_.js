const A = require('axios');
const K = require('kefir');
const R = require('ramda');
const I = require('infestines');
const L = require('partial.lenses');
const util = require('util');

const argv = process.argv.slice(2);

const client = A.create({
  baseURL: 'https://api.twitch.tv/v5/',
});

const _h = () => {};

const tap = fn => x => {
  fn(x);
  return x;
}

const getBorders = xs => [xs[0], xs[xs.length - 1]];

const videoId = '404438496';

client.interceptors.request.use(config => {
  config.params = L.set('client_id', clientId, config.params);
  return config;
});

const doGet = (id, cursor) =>
  K.fromPromise(client.get(`videos/${id}/comments`, { params: { cursor }}))
   .map(L.get('data'))
   .toProperty();

const doPagedGet = (id, cursor) =>
  doGet(id, cursor)
    .flatMapConcat(data =>
      K.merge([K.constant(data),
               doPagedGet(id, data._next)]));

const commentList =
  doPagedGet(videoId).map(L.get('comments'))
                     .flatten();

const commentCount =
  commentList.map(R.always(1))
             .scan(R.add, 0);

commentCount.log();
