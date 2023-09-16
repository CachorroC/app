import { WithId, ObjectId } from 'mongodb';
// To parse this data:
//
//   import { Convert } from "./file";
//
//   const intNota = Convert.toIntNota(json);

export interface intNotaFormValues {
  nota: string;
  tareas: Tarea[];
}

export interface Tarea {
  tarea: string;
  isDone: boolean;
  dueDate: string;
}

export interface intNota extends intNotaFormValues {
  llaveProceso: string;
  pathname: string;
  fecha: string;
}

export interface monNota extends intNota {
  _id: string;
}

export class notaConvert {
  public static toMonNotas(
    notas: WithId<intNota>[]
  ): monNota[] {
    const newNotas = notas.map(
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
  public static monNotasToJson(
    value: monNota[]
  ): string {
    return JSON.stringify(
      value
    );
  }

  public static toMonNota(
    nota: WithId<intNota>
  ): monNota {
    const newNota = {
      ...nota,
      _id: nota._id.toString(),
    };

    return newNota;
  }
  public static monNotaToJson(
    value: monNota
  ): string {
    return JSON.stringify(
      value
    );
  }
  public static toTarea(
    json: string
  ): Tarea {
    return JSON.parse(
      json
    );
  }
  public static tareaToJson(
    value: Tarea
  ): string {
    return JSON.stringify(
      value
    );
  }
}

export class NotaBuilder implements intNota {
  constructor(
    {
      llaveProceso, fecha, pathname, nota, tareas
    }: { llaveProceso: string; fecha: string; pathname: string; nota: string;  tareas: Tarea[]}
  ) {
    this.llaveProceso = llaveProceso;
    this.pathname = pathname;
    this.fecha = fecha;
    this.nota = nota;
    this.tareas = tareas;
  }
  llaveProceso: string;
  pathname: string;
  fecha: string;
  nota: string;
  tareas: Tarea[];
}