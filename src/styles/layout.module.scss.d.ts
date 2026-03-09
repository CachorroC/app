export type Styles = {
  button               : string;
  buttonActiveCategory : string;
  buttonActuacion      : string;
  buttonBackwards      : string;
  buttonChip           : string;
  buttonDrawer         : string;
  buttonDrawerClosed   : string;
  buttonDrawerOpen     : string;
  buttonEdit           : string;
  buttonForward        : string;
  buttonHome           : string;
  buttonModal          : string;
  buttonPassiveCategory: string;
  container            : string;
  divission            : string;
  header               : string;
  icon                 : string;
  label                : string;
  left                 : string;
  leftColumn           : string;
  leftGrid             : string;
  link                 : string;
  linkActive           : string;
  loader               : string;
  nav                  : string;
  right                : string;
  section              : string;
  sectionColumn        : string;
  sectionRow           : string;
  segment              : string;
  segmentColumn        : string;
  segmentDetached      : string;
  segmentRow           : string;
  segmentRowWrap       : string;
  spin                 : string;
  text                 : string;
  title                : string;
  titleInput           : string;
  top                  : string;
};

export type ClassesType = keyof Styles;

declare const styles: Styles;

export default styles;
