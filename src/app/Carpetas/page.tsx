import { CarpetasTable } from '#@/components/Carpetas/client/carpetasList';
import {  Table } from '#@/components/Table';
import { LefttableLoader } from '#@/components/Table/loader';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { Category } from '#@/lib/types/carpetas';
import { Fragment, Suspense } from 'react';

export const revalidate = 86400;

export default async function Page () {
  const carpetas = await getCarpetas();

  const newRows = carpetas.map( ( carpeta ) => {
    return {
      numero              : carpeta.numero,
      nombre              : carpeta.nombre,
      category            : carpeta.category as Category,
      actuacion           : carpeta.ultimaActuacion?.actuacion ?? '',
      anotacion           : carpeta.ultimaActuacion?.anotacion ?? '',
      revisado            : carpeta.revisado,
      expediente          : carpeta.llaveProceso,
      fechaUltimaActuacion: carpeta.fecha
        ? carpeta.fecha.toLocaleDateString(
          'es-CO', {
            weekday: 'long',
            year   : 'numeric',
            month  : 'long',
            day    : 'numeric'
          }
        )
        : '',
      ciudad : carpeta.ciudad ?? '',
      juzgado: `JUZGADO ${ carpeta.juzgado?.id } ${ carpeta.juzgado?.tipo } DE ${ carpeta.juzgado?.ciudad }`
    };
  } );

  return (
    <Fragment>

      <Suspense fallback={<LefttableLoader />}>
        <CarpetasTable />
      </Suspense>
      <Suspense fallback={ <LefttableLoader /> }>
        <Table rows={ newRows } />
      </Suspense>

    </Fragment>
  );
}
