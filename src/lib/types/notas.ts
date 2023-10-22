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

export interface monNota extends intNota {
  _id: string;
}

export class Nota implements intNota {
  cod: number;
  text: string;
  pathname: string;
  date: Date;
  carpetaNumero?: number;
  constructor (
    nota: string,
    path: string,
    notasSize: number,
    numeroCarpeta? : number
  ) {
    this.cod = notasSize++;
    this.text = nota;
    this.pathname = path;
    this.date = new Date();
    this.carpetaNumero = numeroCarpeta;

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
    nota: WithId<intNota>
  ): monNota {
    const newNota = {
      ...nota,
      _id: nota._id.toString(),
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
