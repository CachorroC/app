import { Category, MonCarpeta } from './carpetas';
import { monNota } from './notas';

export interface IntAction {
  type: ActionType;
  sortDirection: boolean;
  search?: string;
  category?: Category;
}

export interface IntNotaAction {
  type: ActionNotaType;
  sortDirection: boolean;
}

export type ActionNotaType = keyof monNota;

export type ActionType = keyof MonCarpeta;
