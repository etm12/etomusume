import * as L from 'partial.lenses';
import * as I from 'infestines';
import * as R from 'ramda';
import * as U from '../../util';

//

const defaults = {
  style: 'Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
  events: 'Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
};

const timecodeL = [];
const paddedNumL = [];

const eventFormat = {
  layer: [],
  start: timecodeL,
  end: timecodeL,
  style: [],
  name: [],
  marginL: paddedNumL,
  marginR: paddedNumL,
  marginV: paddedNumL,
  effect: [],
  text: [],
};

const a = {
  layer: 0,
  start: '00:00:00.000',
  end: '00:00:00.000',
  style: 'Default',
  name: '',
  marginL: 0,
  marginR: 0,
  marginV: 0,
  effect: '',
  text: 'Foo bar top kek 123 xd',
};

//

export const toKeyValue = I.defineNameU(R.join(': '), 'toKeyValue');

export const toGroupTitle = I.defineNameU(U.wrapString('[', ']'), 'toGroupTitle');

export const toGroupBody = R.pipe(
  R.map(toKeyValue),
  U.unlines,
);

export const group = I.curry(function group(title, body) {
  return [
    toGroupTitle(title),
    toGroupBody(body),
  ].join('\n');
});

export const groups = I.defineNameU(R.pipe(
  R.map(R.apply(group)),
  R.join('\n\n'),
), 'groups');

export const toAss = (info, styleFormat = defaults.style, eventsFormat = defaults.events) => (style, events) => {
  const _info = [
    'Script Info',
    Object.entries(info),
  ];

  const _styles = [
    'V4+ Styles',
    [['Format', styleFormat], ['Style', style]],
  ];

  // Subtitles
  const _events = [
    'Events',
    [['Format', eventsFormat], ...events.map(ev => ['Dialogue', ev])],
  ];

  return groups([_info, _styles, _events]);
};

export default toAss;
