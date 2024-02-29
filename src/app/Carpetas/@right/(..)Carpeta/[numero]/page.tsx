import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fixMoney } from '#@/lib/project/helper';
import typography from '#@/styles/fonts/typography.module.css';
import type { Route } from 'next';
import { Suspense } from 'react';
import layout from '#@/styles/layout.module.css';
import { Loader } from '#@/components/Loader';
import { InputSection } from '#@/components/Form/input-section';
import { DeudorFormComponent } from '#@/app/Carpeta/[numero]/deudor-form-component';
import InformationComponent from '#@/app/Carpeta/[numero]/information-component';
import { ProcesoCardLoader } from '#@/components/Proceso/proceso-card-loader';

export default async function Page(
  {
    params
  }: { params: { numero: string } }
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
        demanda, idProcesos
      } = carpeta;

      let idProcesoContent;

      if ( idProcesos && idProcesos.length > 0 ) {
        idProcesoContent = idProcesos.map(
          (
            idProceso
          ) => {
                    return (
                      <Link
                        key={idProceso}
                        href={
                          `/Carpeta/${ params.numero }/ultimasActuaciones/${ idProceso }` as Route
                        }
                      >

                      </Link>
                    );
          }
        );
      }

      return (
        <>
          <Suspense fallback={<ProcesoCardLoader />}>
            <InformationComponent carpeta={carpeta} />
          </Suspense>
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
          <Suspense fallback={<Loader />}>

            <section className={layout.segmentColumn}>
              <h5 className={typography.titleMedium}>Capital Adeudado:</h5>
              <p className={typography.bodyMedium}>
                {' '}
                {demanda?.capitalAdeudado
            && fixMoney(
              {
                valor: Number(
                  demanda.capitalAdeudado
                ),
              }
            )}
              </p>
            </section>
          </Suspense>
          <Suspense fallback={<Loader />}>
            { idProcesoContent }
          </Suspense>
        </>
      );
}
