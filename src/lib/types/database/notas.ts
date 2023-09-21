// To parse this data:
//
//   import { Convert } from "./file";
//
//   const intNota = Convert.toIntNota(json);

export interface IntNota {
  text: string;
  id: number;
  date: string | null;
  done: boolean | null;
  pathname: string | null;
  llaveProceso: string | null;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toIntNota(
    json: string 
  ): IntNota[] {
    return JSON.parse(
      json 
    );
  }

  public static intNotaToJson(
    value: IntNota[] 
  ): string {
    return JSON.stringify(
      value 
    );
  }
}
