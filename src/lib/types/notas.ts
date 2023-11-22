import { Nota } from '@prisma/client';
import { WithId } from 'mongodb';
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
  id!: number;
  pathname: string | null;
  date: Date;
  carpetaNumero: number | null;
  constructor (
    {
      content, title,  path, date, carpetaNumero
    }: {
      title: string;
      content?: string;
      path?: string;
      carpetaNumero?: number
      date? : Date}
  ) {
            this.pathname = path
              ? path
              : null;
            this.date = date
              ? date
              :  new Date();
            this.carpetaNumero = carpetaNumero
              ? carpetaNumero
              : null;
            this.createdAt = new Date();
            this.content = content
              ? content
              : null;
            this.title = title;


  }
  content: string | null;
  title: string;
  updatedAt!: Date;
  createdAt!: Date;

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
