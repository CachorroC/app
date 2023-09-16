export type Styles = {
  active: string;
  activeBackwards: string;
  activeDrawerMenu: string;
  activeForward: string;
  activeHome: string;
  activeModal: string;
  button: string;
  buttonBackwards: string;
  buttonDrawerMenu: string;
  buttonForward: string;
  buttonHome: string;
  buttonModal: string;
  buttonsRow: string;
  buttonTextHelper: string;
  icon: string;
  text: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
