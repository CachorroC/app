export type Styles = {
  container: string;
  divission: string;
  header: string;
  left: string;
  link: string;
  loader: string;
  right: string;
  spin: string;
  top: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
