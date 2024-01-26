
// To parse this data:
//
//   import { Convert } from "./file";
//
//   const IntNota = Convert.toIntNota(json);

import { WithId } from 'mongodb';

export interface NotaEditorAction {
  message: string;
  data: monNota | null | IntNota | NewNota;
  error: boolean;
}

export interface NewNota
{

  carpetaNumero: number | null;
  done: boolean;
  content: string[];
  dueDate: Date | null;
  text: string;
  extraContent: string | null;
  pathname: string | null;
}

export interface IntNota extends NewNota{
  id: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface monNota extends IntNota {
  _id: string;
  carpetaNumero: number | null;
  pathname: string | null;
}

export type SortActionType = {
  type: 'sort';
  dir: boolean;
  sortingKey:
    | 'carpetaNumero'
    | 'id'
    | 'dueDate'
    | 'createdAt'
    | 'text'
    | 'updatedAt';
};

export type UpdateActionType = {
  type: 'changed';
  task: IntNota;
};

export type DeleteActionType = {
  type: 'deleted';
  id: number;
};

export type ResetActionType = {
  type: 'reset';
  payload: IntNota[];
};

export type AddActiontype = {
  type: 'added';
  task: IntNota
};

export interface IntNotaAction {
  type: 'added' | 'changed' | 'deleted';
  task: IntNota;
}

export type NotaAction =
  | AddActiontype
  | DeleteActionType
  | ResetActionType
  | UpdateActionType
  | SortActionType;

export class notasConvert {
  public static monNotasToJson(
    value: monNota[]
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static monNotaToJson(
    value: monNota
  ): string {
            return JSON.stringify(
              value
            );
  }

  public static toMonNota(
    nota: WithId<IntNota>
  ): monNota {
            const newNota = {
              ...nota,
              createdAt    : new Date(),
              _id          : nota._id.toString(),
              carpetaNumero: nota.carpetaNumero
                ? nota.carpetaNumero
                : null,
              pathname: nota.pathname
                ? nota.pathname
                : null,
            };

            return newNota;
  }

  public static toMonNotas(
    rawNotas: WithId<IntNota>[]
  ): monNota[] {
            const newNotas = rawNotas.map(
              (
                nota
              ) => {
                        return this.toMonNota(
                          nota
                        );
              }
            );

            return newNotas;
  }
}
