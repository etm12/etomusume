import * as L from 'partial.lenses';
import * as U from './util';

const padZero = U.padStart(2);
const padTwo = padZero(0);

export const multiJsonL = [L.split('\n'), L.elems, L.json()];

export const timecodeL = L.reread(x => {
  const h = ~~(x / 3600);
  const m = ~~((x % 3600) / 60);
  const s = ~~(x % 60);
  const ms = x % 1;

  return [
    [
      `${h}`.padStart(2, 0),
      `${m}`.padStart(2, 0),
      `${s}`.padStart(2, 0),
    ].join(':'),
    `${ms.toFixed(3)}`.slice(2),
  ].join('.');
})

export const displayCommentL = L.pick({
  message: ['message', 'body'],
  user: ['commenter', 'name'],
  offset: ['content_offset_seconds', timecodeL],
  endTime: ['content_offset_seconds', L.reread(x => x + 2.5), timecodeL],
});

//

export const fromFileT = L.collect(multiJsonL);
