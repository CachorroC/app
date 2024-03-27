import { notFound } from 'next/navigation';
import typography from '#@/styles/fonts/typography.module.css';
import { getActuaciones } from '#@/lib/project/utils/Actuaciones/actuaciones-main';
import OutputDateHelper from '#@/lib/project/output-date-helper';

export default async function Page(
  {
    params: {
      idProceso
    },
  }: {
    params: {
      numero: string;
      idProceso: string;
    };
  }
) {
      const actuaciones = await getActuaciones(
        {
          idProceso: Number(
            idProceso
          ),

        }
      );

      if ( !actuaciones ) {
        return notFound();
      }

      return (
        <>
          <span
            className={typography.titleMedium}
          >{`${ actuaciones.length } actuaciones:`}</span>
          {actuaciones.map(
            (
              actuacion
            ) => {
                      return (
                        <li key={actuacion.idRegActuacion}>
                          { `actuacion numero ${ actuacion.consActuacion }de ${ actuacion.cant }` }
                          <OutputDateHelper incomingDate={ actuacion.fechaRegistro } />

                        </li>
                      );
            }
          )}
        </>
      );
}
