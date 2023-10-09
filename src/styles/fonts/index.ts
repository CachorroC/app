import { Inter,
  Raleway,
  Playfair_Display,
  Jost,
  Josefin_Sans,
  Roboto } from 'next/font/google';

export const playDisp = Playfair_Display(
  {
    subsets: [
      'latin-ext',
      'latin'
    ],
    preload : true,
    variable: '--play-display'
  }
);

export const inter = Inter(
  {
    subsets: [
      'latin-ext',
      'latin'
    ],
    display : 'auto',
    preload : false,
    variable: '--inter',
  }
);

export const josefina = Josefin_Sans(
  {
    subsets: [
      'latin'
    ],
    preload : false,
    variable: '--josefa',
  }
);

export const jost = Jost(
  {
    subsets: [
      'latin-ext'
    ],
    preload : true,
    variable: '--jost'
  }
);

export const raleway = Raleway(
  {
    subsets: [
      'latin'
    ],
    preload : false,
    variable: '--raleway',
  }
);

export const roboto = Roboto(
  {
    subsets: [
      'latin'
    ],
    preload : false,
    variable: '--roboto',
    weight  : [
      '100',
      '300',
      '400',
      '500',
      '700',
      '900'
    ],
  }
);
