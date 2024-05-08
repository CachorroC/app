export type Styles = {
  closed: string;
  fadein: string;
  fadeout: string;
  open: string;
  show: string;
  snackbar: string;
  wrapper: string;
};

export type ClassesType = keyof Styles;

declare const styles: Styles;

export default styles;
