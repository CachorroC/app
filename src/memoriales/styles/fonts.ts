import { Quicksand, IBM_Plex_Mono } from 'next/font/google';

export const quicksandMemoriales = Quicksand( {
  subsets: [
    'latin'
  ],
  weight: [
    '400',
    '500',
    '600',
    '700'
  ],
  variable: '--font-quicksand',
} );

export const plexMonoMemoriales = IBM_Plex_Mono( {
  subsets: [
    'latin'
  ],
  weight: [
    '400',
    '500'
  ],
  variable: '--font-plex-mono',
} );
