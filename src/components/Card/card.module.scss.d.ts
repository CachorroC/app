export type Styles = {
  actuacion: string;
  anotacion: string;
  card: string;
  container: string;
  content: string;
  date: string;
  dummytxt: string;
  errorContainer: string;
  icon: string;
  link: string;
  links: string;
  section: string;
  sub: string;
  title: string;
  tooltiptext: string;
  updated: string;
};

export type ClassesType = keyof Styles;

declare const styles: Styles;

export default styles;
