import * as migration_20260607_121629 from './20260607_121629';
import * as migration_20260611_120945 from './20260611_120945';

export const migrations = [
  {
    up: migration_20260607_121629.up,
    down: migration_20260607_121629.down,
    name: '20260607_121629',
  },
  {
    up: migration_20260611_120945.up,
    down: migration_20260611_120945.down,
    name: '20260611_120945'
  },
];
