/** Represents the data required to create a new Nota entry in Prisma. */
export type NewNota = {
  id           : string;
  text         : string;
  dueDate      : Date | null;
  carpetaNumero: number | null;
  pathname     : string | null;
  content      : string[];
  completed    : boolean;
};

/** Mirrors the full Prisma Nota model as returned from a database query. */
export interface IntNota extends NewNota {
  updatedAt     : Date;
  createdAt     : Date;
  RelevantDates?: IntRelevantDate[];
}

/** Mirrors the Prisma RelevantDates model. */
export type IntRelevantDate = {
  id    : string;
  date  : Date;
  text  : string;
  notaId: string | null;
};

export interface NotaEditorAction {
  message: string;
  data   : IntNota | NewNota | null;
  error  : boolean;
}

export type SortActionType = {
  type      : 'sort';
  dir       : boolean;
  sortingKey:
    'carpetaNumero' | 'id' | 'dueDate' | 'createdAt' | 'text' | 'updatedAt';
};

export type UpdateActionType = {
  type: 'changed';
  nota: IntNota;
};

export type DeleteActionType = {
  type: 'deleted';
  id  : string;
};

export type ResetActionType = {
  type   : 'reset';
  payload: IntNota[];
};

export type AddActiontype = {
  type: 'added';
  nota: IntNota;
};

export interface IntNotaAction {
  type: 'added' | 'changed' | 'deleted';
  nota: IntNota;
}

export type NotaAction =
  | AddActiontype
  | DeleteActionType
  | ResetActionType
  | UpdateActionType
  | SortActionType;
