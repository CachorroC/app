export type Styles = {
  container: string;
  flex     : string;
  grid     : string;
};

export type ClassesType = keyof Styles;

declare const styles: Styles;

export default styles;
