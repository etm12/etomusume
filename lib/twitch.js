// const A = require('axios');
import A from 'axios';
import * as K from 'kefir';
import * as L from 'partial.lenses';

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
 * @return {K.Property<Twitch.IComment, any>}
 */
export default function main(clientId, videoId) {
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
   * @return {K.Property<Twitch.IComment, any>}
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
