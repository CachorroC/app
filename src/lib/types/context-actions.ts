import { Nota } from '@prisma/client';
import { Category, MonCarpeta } from './carpetas';
import { monNota } from './notas';
import { IntTask } from '#@/app/Ayudante/Navidad/TasksContext';

export interface IntAction {
  type: ActionType;
  sortDirection: boolean;
  search?: string;
  category?: Category;
}

export interface IntTaskAction {
  type: 'added' | 'changed' | 'deleted';
  task: IntTask

}

export interface IntNotaAction {
  type: ActionMonNotaType;
  sortDirection: boolean;
}

export interface NotaAction {
  type: ActionNotaType;
  sortDirection: boolean;
}

export type ActionMonNotaType = keyof monNota;

export type ActionNotaType = keyof Nota;

export type ActionType = keyof MonCarpeta;
