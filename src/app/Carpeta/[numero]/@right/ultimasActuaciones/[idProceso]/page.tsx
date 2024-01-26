import { notFound } from 'next/navigation';
import typography from '#@/styles/fonts/typography.module.css';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { fetchActuaciones } from '#@/lib/project/utils/Actuaciones';


export default async function Page(
  {
    params: {
      idProceso
    }
  }: {  params: {
    numero: string;
    idProceso: string;
  };}
) {
      const actuaciones = await fetchActuaciones(
        Number(
          idProceso
        )
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
                          {`actuacion numero ${ actuacion.consActuacion }de ${ actuacion.cant }`}
                          {OutputDateHelper(
                            actuacion.fechaRegistro
                          )}
                        </li>
                      );
            }
          )}
        </>
      );
}
