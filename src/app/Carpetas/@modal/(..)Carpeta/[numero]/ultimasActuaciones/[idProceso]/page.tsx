import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getActuaciones } from '#@/lib/project/utils/Actuaciones/actuaciones-main';
import  { ActuacionesLoader } from '#@/components/Actuaciones/actuacion-loader';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { NombreComponent } from '#@/components/nombre';
import styles from '#@/styles/layout.module.css';
import { ActuacionesListContainer } from '#@/components/Actuaciones/actuaciones-list';
import { ModalLoader } from '#@/components/Loader/main-loader';

async function ActuacionesListModalget (
  {
    idProceso
  }: {idProceso: number; }
) {
      const actuacionesPromise = getActuaciones(
        {
          idProceso: Number(
            idProceso
          ),
        }
      );

      return (
        <Suspense fallback={<ActuacionesLoader />}>
          <ActuacionesListContainer actuacionesPromise={  actuacionesPromise} />
        </Suspense>
      );

}

export default async function Page(
  {
    params
  }: { params: { numero: string; idProceso: string } }
) {


      if ( params.idProceso === 'idProceso' ) {
        return notFound();
      }

      const carpeta = await getCarpetabyNumero(
        Number(
          params.numero
        )
      );




      return (
        <>
          <div className={styles.segmentRow}>
            <NombreComponent nombre={ carpeta.nombre } carpetaNumero={ carpeta.numero} />

          </div>


          <Suspense fallback={<ModalLoader />}>
            <ActuacionesListModalget  idProceso={Number(
              params.idProceso
            )} />
          </Suspense>
        </>
      );
}
