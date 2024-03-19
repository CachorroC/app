import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getActuaciones } from '#@/lib/project/utils/Actuaciones/actuaciones-main';
import { outActuacion } from '#@/lib/types/actuaciones';
import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import  { ActuacionesLoader } from '#@/components/Card/actuacion-loader';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { Modal } from '#@/components/Modal';
import { NombreComponent } from '#@/components/nombre';
import styles from '#@/styles/layout.module.css';

async function ActuacionesList (
  {
    idProceso
  }: {idProceso: number}
) {
      const actuaciones = await getActuaciones(
        {
          idProceso: Number(
            idProceso
          ),
          index: 1
        }
      );

      return (
        <div className={styles.gridContainer}>
          {
            actuaciones.map(
              (
                actuacion
              ) => {
                        const newActuacion: outActuacion = {
                          ...actuacion,
                          isUltimaAct: actuacion.cant === actuacion.consActuacion,
                          idProceso  : Number(
                            idProceso
                          ),
                        };
                        return (
                          <Suspense key={newActuacion.idRegActuacion}fallback={<ActuacionesLoader />}>
                            <ActuacionComponent
                              key={newActuacion.idRegActuacion}
                              incomingActuacion={newActuacion}
                            />
                          </Suspense>
                        );
              }
            ) }
        </div> );

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


        <Modal>
          <div className={styles.segmentRow}>
            <NombreComponent primerNombre={ carpeta.deudor?.primerNombre ?? '' }
              primerApellido={ carpeta.deudor?.primerApellido ?? '' }
              segundoApellido={ carpeta.deudor?.segundoApellido ?? null }
              segundoNombre={ carpeta.deudor?.segundoNombre ?? null }/>

          </div>


          <Suspense fallback={<ActuacionesLoader />}>
            <ActuacionesList  idProceso={Number(
              params.idProceso
            )} />
          </Suspense>
        </Modal>
      );
}
