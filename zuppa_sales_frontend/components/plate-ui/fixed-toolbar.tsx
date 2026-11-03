/* eslint-disable max-len */
import { withCn } from '@udecode/cn';

import { Toolbar } from './toolbar';

// export const FixedToolbar = withCn(
//   Toolbar,
//   'supports-backdrop-blur:bg-background/60 sticky left-0 top-[57px] z-50 w-full justify-between overflow-x-auto rounded-t-lg border-b border-b-border bg-background/95 backdrop-blur plate-theme'
// );

export const FixedToolbar = withCn(
  Toolbar,
  'sticky top-0 left-0 z-50 scrollbar-hide w-full justify-between rounded-t-lg border-y-10 border-x-10 !border-yellow bg-white p-1 backdrop-blur-sm supports-backdrop-blur:bg-white/90',
);
