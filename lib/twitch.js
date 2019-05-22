const A = require('axios');
const K = require('kefir');
const R = require('ramda');
const I = require('infestines');
const L = require('partial.lenses');
const util = require('util');

//

const getWithClient = (client, id, cursor) =>
  K.fromPromise(client.get(`videos/${id}/comments`, { params: { cursor } }))
   .map(L.get('data'));

//

/**
 *
 * @param {string} clientId
 * @param {string} videoId
 * @return {K.Observable<any, any>}
 */
function main(clientId, videoId) {
  const client = A.create({
    baseURL: 'https://api.twitch.tv/v5/',
  });

  client.interceptors.request.use(config => {
    config.params = L.set('client_id', clientId, config.params);
    return config;
  });

  /**
   *
   * @param {string} id
   * @param {string} cursor
   * @return {K.Property<any, any>}
   */
  const doRecGet = (id, cursor) =>
    getWithClient(client, id, cursor)
      .flatMapConcat(data =>
        K.merge([K.constant(data),
                 doRecGet(id, data._next)]));

  const comments = doRecGet(videoId).map(L.get('comments')).flatten();

  return comments;
}

module.exports = main;
