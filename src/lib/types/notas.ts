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
  carpetaNumero?: number | null;
  id: number;
  text: string;
  pathname?: string | null;
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
    this.createdAt= new Date();

  }
  createdAt: Date;

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
    this.createdAt = new Date();

  }
  createdAt: Date;

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
    nota: WithId<intNota>
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
        : null
    };

    return newNota;
  }

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
}
