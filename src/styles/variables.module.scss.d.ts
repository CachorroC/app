export type Styles = {
  backgroundColor: string;
  primaryColor   : string;
  secondaryColor : string;
};

export type ClassesType = keyof Styles;

declare const styles: Styles;

export default styles;
