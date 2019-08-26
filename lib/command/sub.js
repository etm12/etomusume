import { readFileSync } from 'fs';
import * as L from 'partial.lenses';
import * as R from 'ramda';

import * as Sub from '../subs/formats';
import * as M from '../meta';

export const command = 'sub <infile>';

export const describe = 'Convert scraped comments into subtitles';

export const builder = yargs => yargs
  .option('to', {
    alias: 't',
    describe: 'Subtitle kind',
    choices: ['nico', 'srt'],
    required: true,
  })
  .option('width', {
    alias: 'w',
    type: 'number',
    required: true,
  })
  .option('height', {
    alias: 'h',
    type: 'number',
    required: true,
  });

export const handler = argv => {
  const data = readFileSync(argv.infile).toString();
  const x = M.fromFileT(data.trim());
  const y = L.collect([L.elems, M.displayCommentL], x);

  switch (argv.to) {
    case 'nico':
      const renderSubs =
        Sub.ass({
          ScriptType: 'V4.00+',
          PlayResX: argv.w,
          PlayResY: argv.h,
        });

      const subStyle = 'Default,Sans,50,&H00FFFFFF,&H0000FFFF,&H000078B4,&H00000000,0,0,0,0,100,100,0,0,1,3,0,2,20,20,20,0';
      const subEvents = []
        .concat(y)
        .map(x => {
          const ypos = Math.trunc(Math.random() * 1080);
          return [
            0,
            x.offset,
            x.endTime,
            'Default',
            '',
            '0000',
            '0000',
            '0000',
            '',
            `{\\move(1920,${ypos},0,${ypos})}${x.message}`,
          ].join(',');
        });

      const result = renderSubs(subStyle, subEvents);

      console.log(result);
    default:
      break;
  }
};

//

function toNico(comment) {
  return 'Dialogue: ';
}
