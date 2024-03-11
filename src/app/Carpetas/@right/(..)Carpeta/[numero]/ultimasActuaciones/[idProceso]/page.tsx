import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Loader } from '#@/components/Loader';
import { InputSection } from '#@/components/Form/input-section';
import { DeudorFormComponent } from '#@/app/Carpeta/[numero]/deudor-form-component';
import { getActuaciones } from '#@/lib/project/utils/Actuaciones/actuaciones-main';
import { outActuacion } from '#@/lib/types/actuaciones';
import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import  { ActuacionesLoader } from '#@/components/Card/actuacion-loader';
import { CarpetaFormProvider } from '#@/app/Context/carpeta-form-context';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';

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
          <Suspense fallback={<Loader />}>
            <DeudorFormComponent />
          </Suspense>

          <Suspense fallback={<Loader />}>
            <InputSection
              key={params.numero}
              name={'llaveProceso'}
              title={'Numero de expediente'}
              type={'text'}
            />
          </Suspense>

          <Suspense fallback={<ActuacionesLoader />}>
            <ActuacionesList idProceso={Number(
              params.idProceso 
            )} />
          </Suspense>
        </CarpetaFormProvider>
      );
}