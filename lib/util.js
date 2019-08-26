import * as L from 'partial.lenses';
import * as I from 'infestines';

export const method0 = (m, o) => () => o[m]();
export const method1 = (m, o) => a => o[m](a);
export const method2 = (m, o) => (a, b) => o[m](a, b);

export const padStart = I.curry(function padStart(x, n, str) {
  return str.padStart(x, n);
});

export const padEnd = I.curry(function padEnd(x, n, str) {
  return str.padEnd(x, n);
});

export const wrapString = I.curry(function wrapString(l, r, str) {
  return [l, str, r].join('');
});

//

const linesL = L.split('\n');

export const lines = I.defineNameU(function lines(x) {
  return L.get(linesL, x);
});

export const unlines = I.defineNameU(function unlines(x) {
  return L.getInverse(linesL, x);
});
