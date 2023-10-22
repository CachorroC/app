// To parse this data:
//
//   import { Convert } from "./file";
//
//   const tarea = Convert.toTarea(json);

import { WithId } from 'mongodb';

export type Abogado = 'Melissa' | 'Carmen' | 'Fernando' | 'Camilo';

export interface Tarea {
  id: number;
  dueDate: Date | null;
  creationDate: Date;
  abogado?: Abogado;

  text: string;
  done: boolean;
}

export interface intTarea
{
  id: number;
  dueDate: Date | null;
  creationDate: Date;
  abogado?: Abogado;
    carpetaNumero?: number;
  text: string;
  done: boolean;

}

export interface monTarea extends intTarea
{
    _id: string;

}

export class BuildTarea implements intTarea {
  abogado?: Abogado;
  dueDate: Date | null;
  creationDate: Date;
  done: boolean;
  id: number;
  text: string;
  carpetaNumero?: number;

  constructor(
    id: number,
    {
      date,
      abogado,
      done,
      text,
      dueDate,
      numeroCarpeta
    }: {

        date: string | Date;
    abogado: string;
    done: boolean;
        text: string;
        dueDate?: string | Date | null;
        numeroCarpeta?: number;

  }
  ) {
    this.id = id++;
    this.creationDate = new Date(
      date
    );
    this.carpetaNumero = numeroCarpeta;
    this.abogado = abogado as Abogado;
    this.text = text;
    this.done = done;

    if ( dueDate ) {
      this.dueDate = new Date(
        dueDate
      );
    } else {
      this.dueDate = null;
    }
  }
}

// Converts JSON strings to/from your types
export class tareaConvert {
  public static tareaToJson(
    value: intTarea
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toTarea(
    json: string
  ) {
    const nT = JSON.parse(
      json
    );

    const tarea = new BuildTarea(
      0,
      nT
    );

    return tarea;
  }
  public static toMonTarea (
    tarea: WithId<intTarea>
  ): monTarea {
    const outPutTarea: monTarea = {
      ...tarea,
      _id: tarea._id.toString()
    };
    return outPutTarea;
  }
}
