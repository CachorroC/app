export type Styles = {
  accordion: string;
  content  : string;
  isActive : string;
  isDone   : string;
  item     : string;
  notDone  : string;
  title    : string;
};

export type ClassesType = keyof Styles;

declare const styles: Styles;

export default styles;
