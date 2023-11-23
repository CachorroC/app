
import { NextResponse } from 'next/server';
import { getProceso } from '#@/lib/project/utils/Procesos';

export async function GET(
  request: Request,
  context: { params: { llaveProceso: string; idProceso: number } },
) {
      try {

        const {
          llaveProceso
        } = context.params;

        const procesos = await getProceso(
          {
            llaveProceso: llaveProceso,
            index       : 1,
          }
        );

        if ( !procesos ) {
          throw new Error(
            'no hay procesos para este numero de expediente '
          );

        }

        return NextResponse.json(
          procesos
        );
      } catch ( e ) {
        console.log(
          e
        );
        return NextResponse.json(
          []
        );
      }
}
