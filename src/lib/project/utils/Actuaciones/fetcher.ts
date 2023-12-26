import { ConsultaActuacion } from '#@/lib/types/actuaciones';
import { sleep } from '../../helper';

export async function fetchActuaciones(
  idProceso: number, index?: number 
) {
      await sleep(
        index ?? 1 
      );

      const res = await fetch(
        `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`,
        {
          cache: 'no-store',
        },
      );
      return res.json() as Promise<ConsultaActuacion>;
}
