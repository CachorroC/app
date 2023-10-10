export type Styles = {
  inputElement: string;
  round: string;
  slider: string;
  switchBox: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
