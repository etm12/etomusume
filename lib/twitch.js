const A = require('axios');
const K = require('kefir');
const L = require('partial.lenses');

//

const getWithClient = (client, id, cursor) =>
  K.fromPromise(client.get(`videos/${id}/comments`, { params: { cursor } }))
   .map(L.get('data'));

//

/**
 * Create an Observable that emits every comment as a single value.
 *
 * @param {string} clientId
 * @param {string} videoId
 * @return {K.Property<IComment, any>}
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
   * @return {K.Property<IComment, any>}
   */
  const doRecGet = (id, cursor) =>
    getWithClient(client, id, cursor)
      .flatMapConcat(data =>
        data._next
          ? K.merge([K.constant(data),
                     doRecGet(id, data._next)])
          : K.constant(data));

  return doRecGet(videoId)
    .map(L.get('comments'))
    .flatten();
}

module.exports = main;
