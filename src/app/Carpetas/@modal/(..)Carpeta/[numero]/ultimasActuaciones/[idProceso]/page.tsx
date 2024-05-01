import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getActuaciones } from '#@/lib/project/utils/Actuaciones/actuaciones-main';
import  { ActuacionesLoader } from '#@/components/Actuaciones/actuacion-loader';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { Modal } from '#@/components/Modal';
import { NombreComponent } from '#@/components/nombre';
import styles from '#@/styles/layout.module.css';
import { ActuacionesListContainer } from '#@/components/Actuaciones/actuaciones-list';
import { Loader } from '#@/components/Loader';
import { Metadata } from 'next';

export async function generateMetadata(
  {
    params,
  }: {
    params: { numero: string };
  }
): Promise<Metadata> {
      const {
        numero
      } = params;

      const product = await getCarpetabyNumero(
        Number(
          numero
        )
      );

      if ( !product ) {
        return {
          title: 'sin carpeta',
        };
      }

      const returnedMetadata: Metadata = {
        title      : product.nombre,
        appleWebApp: {
          capable       : true,
          title         : product.nombre,
          statusBarStyle: 'black'
        },
        description: `el proceso de ${ product.nombre }`,
      };
      return returnedMetadata;
}

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
        <Suspense fallback={<Loader />}>
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


        <Modal>
          <div className={styles.segmentRow}>
            <NombreComponent primerNombre={ carpeta.deudor?.primerNombre ?? '' }
              primerApellido={ carpeta.deudor?.primerApellido ?? '' }
              segundoApellido={ carpeta.deudor?.segundoApellido ?? null }
              segundoNombre={ carpeta.deudor?.segundoNombre ?? null }/>

          </div>


          <Suspense fallback={<ActuacionesLoader />}>
            <ActuacionesListModalget  idProceso={Number(
              params.idProceso
            )} />
          </Suspense>
        </Modal>
      );
}
