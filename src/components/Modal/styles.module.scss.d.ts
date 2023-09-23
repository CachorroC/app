export type Styles = {
  'closed': string;
  'open': string;
  'wrapper': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
