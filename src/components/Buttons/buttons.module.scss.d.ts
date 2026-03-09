export type Styles = {
  active               : string;
  button               : string;
  buttonActiveCategory : string;
  buttonActuacion      : string;
  buttonChip           : string;
  buttonEdit           : string;
  buttonPassiveCategory: string;
  fadein               : string;
  fadeout              : string;
  icon                 : string;
  show                 : string;
  snackbar             : string;
  text                 : string;
};

export type ClassesType = keyof Styles;

declare const styles: Styles;

export default styles;
