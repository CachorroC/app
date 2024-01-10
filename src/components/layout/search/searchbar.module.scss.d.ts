export type Styles = {
  date: string;
  icon: string;
  input: string;
  inputContainer: string;
  inputForm: string;
  isActive: string;
  link: string;
  linkIsActive: string;
  linkNotActive: string;
  notActive: string;
  searchBarLink: string;
  searchBarLinkIsActive: string;
  searchBarLinkNotActive: string;
  sub: string;
  title: string;
};

export type ClassesType = keyof Styles;

declare const styles: Styles;

export default styles;
