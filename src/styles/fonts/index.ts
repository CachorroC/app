import { Raleway,
  Playfair_Display,
  Josefin_Sans,
  PT_Serif_Caption,
  Radio_Canada, } from 'next/font/google';

export const playDisp = Playfair_Display(
  {
    subsets: [
      'latin-ext',
      'latin'
    ],
    preload : true,
    variable: '--play-display',
  } 
);

export const ptserif = PT_Serif_Caption(
  {
    subsets: [
      'latin'
    ],
    display : 'auto',
    preload : false,
    variable: '--inter',
    weight  : '400',
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

export const radio = Radio_Canada(
  {
    subsets: [
      'latin-ext'
    ],
    preload : false,
    variable: '--radio',
  } 
);

export const raleway = Raleway(
  {
    subsets: [
      'latin'
    ],
    preload : true,
    variable: '--raleway',
  } 
);
