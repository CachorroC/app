export type Styles = {
  button: string;
  card: string;
  container: string;
  content: string;
  date: string;
  dummytxt: string;
  icon: string;
  sub: string;
  title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
