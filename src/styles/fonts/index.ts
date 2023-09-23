import { Poiret_One,
  Inter,
  Raleway,
  Josefin_Sans,
  Roboto, } from 'next/font/google';

// define your variable fonts
export const inter = Inter(
  {
    subsets: [
      'latin-ext',
      'latin'
    ],
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

export const poiret = Poiret_One(
  {
    weight  : '400',
    variable: '--font-poiret',
    subsets : [
      'latin',
      'latin-ext'
    ],
  } 
);
