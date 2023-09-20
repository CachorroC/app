// To parse this data:
//
//   import { Convert } from "./file";
//
//   const tarea = Convert.toTarea(json);

import { ObjectId } from 'mongodb';

export type Abogado = 'Melissa' | 'Carmen' | 'Fernando' | 'Camilo';

export interface Tarea {
  id: string;
  date: Date;
  abogado: Abogado;
  text: string;
  done: boolean;
}

export interface intTarea {
  id: string;
  date: Date;
  abogado: Abogado;
  text: string;
  done: boolean;
}

export class BuildTarea implements intTarea {
  constructor(
      {
                      _id,
                      date,
                      abogado,
                      done,
                      text,
      }: {
    _id: ObjectId;
    date: string;
    abogado: string;
    done: boolean;
    text: string;
  } 
  ) {
        ( this.id = _id.toString() ),
        ( this.date = new Date(
                    date 
        ) ),
        ( this.abogado = abogado as Abogado ),
        ( this.text = text ),
        ( this.done = done );
  }
  id: string;
  date: Date;
  abogado: Abogado;
  text: string;
  done: boolean;
}

// Converts JSON strings to/from your types
export class tareaConvert {
  public static toTarea(
      json: string 
  ) {
        const nT = JSON.parse(
                    json 
        );

        const tarea = new BuildTarea(
                    nT 
        );

        return tarea;
  }

  public static tareaToJson(
      value: intTarea 
  ): string {
        return JSON.stringify(
                    value 
        );
  }
}
