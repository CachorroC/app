export type Styles = {
  'container': string;
  'flex': string;
  'grid': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
