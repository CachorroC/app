export type Styles = {
  body: string;
  container: string;
  divission: string;
  drawerMenuButton: string;
  header: string;
  homeButton: string;
  inputSearchBar: string;
  left: string;
  link: string;
  loader: string;
  name: string;
  right: string;
  sidenav: string;
  spin: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
