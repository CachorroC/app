export type Styles = {
  'button': string;
  'card': string;
  'container': string;
  'content': string;
  'date': string;
  'icon': string;
  'title': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
