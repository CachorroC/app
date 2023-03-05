import { ThemeOptions } from '@mui/material/styles';

interface ThemeOptions2 extends ThemeOptions {
  props: object;
  overrides: object;
}
export const themeOptions: ThemeOptions2 = {
  palette: {
    mode: 'light',
    primary: {
      main: '#c51162',
      light: '#f48fb1',
      dark: '#880e4f',
    },
    secondary: {
      main: '#004d40',
      light: '#b2dfdb',
    },
    divider: '#263238',
  },
  typography: {
    button: {
      fontFamily: 'Poiret One',
      fontSize: '1.1rem',
    },
    h1: {
      fontFamily: 'Montserrat',
    },
    body1: {
      fontFamily: 'Poiret One',
    },
    fontFamily: 'Poiret One',
  },
  props: {
    MuiTooltip: {
      arrow: true,
    },
    MuiAppBar: {
      color: 'inherit',
    },
  },
  shape: {
    borderRadius: 4,
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#689f38',
        color: '#fff',
      },
    },
  },
};
