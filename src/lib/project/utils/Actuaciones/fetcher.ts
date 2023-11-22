import { ConsultaActuacion } from '#@/lib/types/actuaciones';

export async function fetchActuaciones (
  idProceso: number
) {
      const res = await fetch(
        `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`,
        {
          next: {
            tags: [
              'Actuaciones'
            ],
          },
        }
      );
      return res.json() as Promise<ConsultaActuacion>;
}
