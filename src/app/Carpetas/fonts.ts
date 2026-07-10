import { Quicksand, IBM_Plex_Mono } from 'next/font/google';

export const quicksandCarpetas = Quicksand( {
  subsets: [
    'latin' 
  ],
  variable: '--font-quicksand-carpetas',
  weight  : 'variable',
  display : 'swap',
} );

export const plexMonoCarpetas = IBM_Plex_Mono( {
  subsets: [
    'latin' 
  ],
  variable: '--font-plex-mono-carpetas',
  weight  : [
    '400',
    '500' 
  ],
  display: 'swap',
} );
