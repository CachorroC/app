export type Styles = {
  active   : string;
  calendar : string;
  container: string;
  days     : string;
  dias     : string;
  disabled : string;
  inactive : string;
  today    : string;
  weeks    : string;
};

export type ClassesType = keyof Styles;

declare const styles: Styles;

export default styles;
