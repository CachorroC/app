
import { getCarpetaByllaveProceso, } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';
import { Form } from 'components/form/Form';
import EditCarpeta from '#@/components/form/Editar-carpeta';
import layout from '#@/styles/layout.module.css';

export default async function PageCarpetaNumero(
  {
    params,
  }: {
  params: { llaveProceso: string };
}
) {
  const carpeta = await getCarpetaByllaveProceso(
    params.llaveProceso
  );


  if ( !carpeta ) {
    return notFound();
  }

  return (
    <div className={ layout.left}>
      <EditCarpeta key={ params.llaveProceso } carpeta={ carpeta } />
    </div>
  );
}
