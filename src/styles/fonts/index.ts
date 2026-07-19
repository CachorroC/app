import { Quicksand, IBM_Plex_Mono, Fraunces, Inter } from 'next/font/google';

export const quicksand = Quicksand( {
  subsets: [
    'latin'
  ],
  preload : true,
  variable: '--font-quicksand',
  weight  : 'variable',
  display : 'swap',
} );

export const plexMono = IBM_Plex_Mono( {
  subsets: [
    'latin'
  ],
  preload : false,
  variable: '--font-plex-mono',
  weight  : [
    '400',
    '500'
  ],
  display: 'swap',
} );

export const fraunces = Fraunces( {
  subsets : [ 'latin' ],
  preload : true,
  variable: '--font-fraunces',
  weight  : 'variable',
  display : 'swap',
  axes    : [ 'opsz', 'WONK' ],
} );

export const inter = Inter( {
  subsets: [ 'latin' ],
  preload: false,
  variable: '--font-inter',
  weight  : [
    '400',
    '500'
  ],
  display: 'swap',
} );
