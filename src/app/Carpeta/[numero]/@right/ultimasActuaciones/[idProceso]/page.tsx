
import { notFound } from 'next/navigation';
import typography from '#@/styles/fonts/typography.module.scss';
import { getActuaciones } from '#@/lib/Actuaciones';
import { OutputDateHelper } from '#@/lib/project/date-helper';

type Props = {
  params: {
    numero: string;
    idProceso: string
  };
};

export default async function Page(
  {
    params: {
      idProceso
    },
  }: Props
) {


  const actuaciones = await getActuaciones(
    {
      idProceso: Number(
        idProceso
      ),
      index: 1
    }
  );

  if ( !actuaciones ) {
    return notFound();
  }

  return (
    <>
      <span className={ typography.titleMedium }>{ `${ actuaciones.length } actuaciones:` }</span>
      { actuaciones.map(
        (
          actuacion
        ) => {
          return (
            <li key={ actuacion.idRegActuacion }>
              { `actuacion numero ${ actuacion.consActuacion }de ${ actuacion.cant }` }
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
