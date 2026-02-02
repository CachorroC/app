export type Styles = {
  button          : string;
  buttonBackwards : string;
  buttonDrawerMenu: string;
  buttonForward   : string;
  buttonHome      : string;
  buttonTextHelper: string;
  closed          : string;
  drawer          : string;
  home            : string;
  icon            : string;
  menu            : string;
  sidenav         : string;
};

export type ClassesType = keyof Styles;

declare const styles: Styles;

export default styles;
