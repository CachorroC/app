import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getActuaciones } from '#@/lib/project/utils/Actuaciones/actuaciones-main';
import { outActuacion } from '#@/lib/types/actuaciones';
import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import  { ActuacionesLoader } from '#@/components/Card/actuacion-loader';
import { CarpetaFormProvider } from '#@/app/Context/carpeta-form-context';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { Modal } from '#@/components/Modal';
import { NombreComponent } from '#@/components/nombre';
import { segmentRow } from '#@/styles/layout.module.css';

async function ActuacionesList (
  {
    idProceso
  }: {idProceso: number}
) {
      const actuaciones = await getActuaciones(
        Number(
          idProceso
        )
      );

      return actuaciones.map(
        (
          actuacion, index
        ) => {
                  const newActuacion: outActuacion = {
                    ...actuacion,
                    isUltimaAct: actuacion.cant === actuacion.consActuacion,
                    idProceso  : Number(
                      idProceso
                    ),
                  };
                  return (
                    <ActuacionComponent
                      key={index}
                      incomingActuacion={newActuacion}
                    />
                  );
        }
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

        <CarpetaFormProvider
          key={params.numero}
          carpeta={carpeta}
        >
          <Modal>
            <div className={segmentRow}>
              <NombreComponent deudor={ carpeta.deudor
                ? carpeta.deudor
                : {
                    carpetaNumero  : null,
                    cedula         : '',
                    direccion      : null,
                    email          : null,
                    id             : 0,
                    primerApellido : 'Sin Nombre',
                    primerNombre   : 'Sin Apellido',
                    segundoApellido: null,
                    segundoNombre  : null,
                    telCelular     : null,
                    telFijo        : null
                  } } />

            </div>


            <Suspense fallback={<ActuacionesLoader />}>
              <ActuacionesList idProceso={Number(
                params.idProceso
              )} />
            </Suspense>
          </Modal>
        </CarpetaFormProvider>
      );
}
