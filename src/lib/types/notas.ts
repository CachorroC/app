import { WithId } from 'mongodb';
// To parse this data:
//
//   import { Convert } from "./file";
//
//   const intNota = Convert.toIntNota(json);

export interface intNota
{
  cod: number;
  text: string;
  pathname: string;
  date: Date;
  done: boolean;
  llaveProceso?: string | null;
}

export interface monNota extends intNota {
  _id: string;
}

export class notasConvert {
  public static toMonNotas(
    rawNotas: WithId<intNota>[]
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
}
