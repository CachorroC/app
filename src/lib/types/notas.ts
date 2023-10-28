import { Nota } from '@prisma/client';
import { ObjectId, WithId } from 'mongodb';
// To parse this data:
//
//   import { Convert } from "./file";
//
//   const intNota = Convert.toIntNota(json);

export interface NotaEditorAction
{
  message: string;
  data: monNota | null | Nota;
  error: boolean;
}

export interface intNota
{
  carpetaNumero?: number;
  id: number;
  text: string;
  pathname?: string ;
  date: Date;
}

export interface monNota extends Nota {
  _id: string;
  carpetaNumero: number | null;
  pathname: string | null;
}


export class NewNota implements Nota {
  id: number;
  text: string;
  pathname: string | null;
  date: Date;
  carpetaNumero: number | null;
  constructor (
    nota: string,
    notasSize: number,
    path?: string,
    numeroCarpeta?: number,
    date? : Date
  ) {
    this.id = notasSize++;
    this.text = nota;
    this.pathname = path
      ? path
      : null;
    this.date = date
      ? date
      :  new Date();
    this.carpetaNumero = numeroCarpeta
      ? numeroCarpeta
      : null;

  }

}

export class NewMonNota implements monNota {
  _id: string;
  id: number;
  text: string;
  pathname: string | null;
  date: Date;
  carpetaNumero: number | null;
  constructor (
    nota: string,
    notasSize: number,
    path?: string,
    numeroCarpeta?: number,
    date?: Date,
    _id?: ObjectId
  ) {
    this._id = _id
      ? _id.toString()
      : 'sinMongoId';
    this.id = notasSize++;
    this.text = nota;
    this.pathname = path
      ? path
      : null;
    this.date = date
      ? date
      : new Date();
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
    nota: WithId<Nota | intNota>
  ): monNota {
    const newNota = {
      ...nota,
      _id          : nota._id.toString(),
      carpetaNumero: nota.carpetaNumero
        ? nota.carpetaNumero
        : null,
      pathname: nota.pathname
        ? nota.pathname
        : null
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
