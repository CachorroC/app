
import clientPromise from '#@/lib/connection/mongodb';
import { InputDateHelper } from '#@/lib/project/date-helper';
import getCarpetas  from '#@/lib/project/utils/Carpetas/getCarpetas';
import { IntCarpeta, NuevaCarpeta } from '#@/lib/types/carpetas';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
      const carpetas = await getCarpetas();

      const carpsLen = carpetas.length;

      const daterFixer = InputDateHelper(
        new Date()
      );

      const defaultValues: NuevaCarpeta = {
        numero  : carpsLen + 1,
        category: 'SinEspecificar',
        deudor  : {
          primerNombre   : '',
          segundoNombre  : '',
          primerApellido : '',
          segundoApellido: '',
          cedula         : 0,
          email          : 'correo@ejemplo.com',
          direccion      : '',
          tel            : {
            celular: 0,
            fijo   : 0,
          },
        },
        demanda: {
          capitalAdeudado        : 1000000,
          entregaGarantiasAbogado: daterFixer,
          tipoProceso            : 'SINGULAR',
          fechaPresentacion      : daterFixer,
          vencimientoPagare      : [
            daterFixer
          ],
          obligacion: [
            'primera obligacion',
            1,
            'tercera obligacion'
          ],
        },
      };

      const stringCarpeta = JSON.stringify(
        defaultValues
      );
      return new NextResponse(
        stringCarpeta, {
          status : 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
}

export async function PUT(
  request: NextRequest
) {



      const json = ( await request.json() ) as IntCarpeta;

      const client = await clientPromise;

      if ( !client ) {
        throw new Error(
          'no hay cliente mongólico'
        );
      }

      const db = client.db(
        'RyS'
      );

      const collection = db.collection<IntCarpeta>(
        'Carpetas'
      );

      const insertCarpeta = await collection.insertOne(
        json
      );

      if ( !insertCarpeta.acknowledged ) {
        return new NextResponse(
          null, {
            status    : 301,
            statusText: 'No se pudo isertar la carpeta',
          }
        );
      }

      return redirect(
        `/Carpeta/${ json.numero }`
      );
      /*  return new NextResponse(
    JSON.stringify(
      insertCarpeta.insertedId
    ), {
      status: 200,
    }
  ); */
}
