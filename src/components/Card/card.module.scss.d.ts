export type Styles = {
  actuacion: string;
  anotacion: string;
  card: string;
  container: string;
  content: string;
  date: string;
  dummytxt: string;
  error: string;
  errorContainer: string;
  icon: string;
  isActive: string;
  link: string;
  linkIsActive: string;
  links: string;
  notActive: string;
  section: string;
  sub: string;
  title: string;
  tooltiptext: string;
  updated: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
