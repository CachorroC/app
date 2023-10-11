import { FechaActuacionComponent } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';
import { Form } from '#@/components/form/Form';
import {  getCarpetabyNumero } from '#@/lib/project/carpetas';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page (
  {
    params
  }: {params: {numero: string}}
) {
  const carpeta = await getCarpetabyNumero(
    Number(
      params.numero
    )
  );

  if ( !carpeta ) {
    return notFound();
  }

  const {
    idProcesos
  } = carpeta;

  let idProcesoContent;

  if ( idProcesos && idProcesos.length > 0 ) {
    idProcesoContent = idProcesos.map(
      (
        idProceso
      ) => {
        return ( <Link key={ idProceso } href={ `/Carpeta/${ params.numero }/ultimasActuaciones/${ idProceso }`}>
        </Link> );
      }
    );
  }

  return (
    <>
      {carpeta.idProcesos
            && carpeta.idProcesos.map(
              (
                idProceso
              ) => {
                return (
                  <FechaActuacionComponent
                    key={idProceso}
                    idProceso={idProceso}
                    index={1}
                  />
                );
              }
            )}
      <Form
        key={params.numero}
        carpeta={carpeta}
      />
      {idProcesoContent}</>
  );
}