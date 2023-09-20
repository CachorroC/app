import { CarpetaCard } from '../../../../components/Card/carpeta';
import { Loader } from '#@/components/Loader';
import { NombreComponent } from 'components/nombre';
import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import { Fragment, Suspense } from 'react';

export default async function DefaultProcesosllaveProceso(
            {
                            params,
            }: {
  params: {
    numero: string;
  };
} 
) {
  const Carpeta = await getCarpetabyNumero(
              Number(
                          params.numero 
              ) 
  );

  return (
    <>
      {Carpeta && (
        <Fragment key={params.numero}>
          <Suspense fallback={<Loader />}>
            <NombreComponent
              key={Carpeta._id}
              deudor={Carpeta.deudor}
            />
          </Suspense>

          <CarpetaCard
            key={Carpeta._id}
            carpeta={Carpeta}
          />
        </Fragment>
      )}
    </>
  );
}
