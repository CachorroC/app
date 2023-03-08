export interface intCard {
  title: string;
  _id?: string;
  index: intIndex;
  name: string;
  url: string;
  state: boolean;
  avatar: intAvatar;
  button: intButton[];
  list: intList[];
  description?: string;
}

export interface intList {
  title?: string;
  text?: string;
  icon?: string;
}

export interface intButton {
  text: string;
  icon: string;
  href: string;
}

export interface intAvatar {
  name: string;
  src: string;
}

export interface intIndex {
  $numberDecimal: string;
}
