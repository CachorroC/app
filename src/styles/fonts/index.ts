import { Inter,
  Raleway,
  Playfair_Display,
  Jost,
  Josefin_Sans,
  Roboto, } from 'next/font/google';

// define your variable fonts

export const playDisp = Playfair_Display(
  {
    subsets: [
      'latin-ext'
    ],
    variable: '--font-poiret'
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
    variable: '--josefa',
  }
);

export const jost = Jost(
  {
    subsets: [
      'latin-ext'
    ],
    variable: '--jost'
  }
);

export const raleway = Raleway(
  {
    subsets: [
      'latin'
    ],
    variable: '--raleway',
  }
);

export const roboto = Roboto(
  {
    subsets: [
      'latin'
    ],
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
