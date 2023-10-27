import { Nota } from '@prisma/client';
import { WithId } from 'mongodb';
// To parse this data:
//
//   import { Convert } from "./file";
//
//   const intNota = Convert.toIntNota(json);

export interface intNota
{
  carpetaNumero?: number;
  cod: number;
  text: string;
  pathname: string;
  date: Date;
}

export interface monNota extends Nota {
  _id: string;
}


export class NewNota implements Nota {
  id: number;
  text: string;
  pathname: string;
  date: Date;
  carpetaNumero: number | null;
  constructor (
    nota: string,
    path: string,
    notasSize: number,
    numeroCarpeta?: number,
    date? : Date
  ) {
    this.id = notasSize++;
    this.text = nota;
    this.pathname = path;
    this.date = date
      ? date
      :  new Date();
    this.carpetaNumero = numeroCarpeta
      ? numeroCarpeta
      : null;

  }

}

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
    nota: WithId<Nota>
  ): monNota {
    const newNota = {
      ...nota,
      _id: nota._id.toString(),
    };

    return newNota;
  }

  public static toMonNotas(
    rawNotas: WithId<Nota>[]
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
