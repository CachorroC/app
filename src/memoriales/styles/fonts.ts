import { Quicksand, IBM_Plex_Mono } from 'next/font/google';

/**
 * `next/font/google` Quicksand loader for the memoriales feature. Loads the
 * Latin subset at weights 400/500/600/700 and exposes the CSS variable
 * `--font-quicksand`.
 */
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

/**
 * `next/font/google` IBM_Plex_Mono loader for the memoriales feature. Loads
 * the Latin subset at weights 400/500 and exposes the CSS variable
 * `--font-plex-mono`.
 */
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
