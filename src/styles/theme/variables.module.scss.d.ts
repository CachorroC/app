export type Styles = {
  'backgroundColor': string;
  'primaryColor': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
