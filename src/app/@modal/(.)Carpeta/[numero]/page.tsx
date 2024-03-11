import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import typography from '#@/styles/fonts/typography.module.css';
import type { Metadata, Route } from 'next';
import { Suspense } from 'react';
import layout from '#@/styles/layout.module.css';
import { Loader } from '#@/components/Loader';
import { InputSection } from '#@/components/Form/input-section';
import { DeudorFormComponent } from '#@/app/Carpeta/[numero]/deudor-form-component';
import InformationComponent from '#@/app/Carpeta/[numero]/information-component';
import { CarpetaFormProvider } from '#@/app/Context/carpeta-form-context';
import { Modal } from '#@/components/Modal';
import MoneyFixer from '#@/lib/project/money-fixer';

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

      return {
        title   : product.nombre,
        keywords: [
          product.nombre,
          product.tipoProceso,
          product.numero.toString(),
          product.tipoProceso,
          product.category,
        ],
      };
}

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
        <CarpetaFormProvider
          key={params.numero}
          carpeta={carpeta}
        >
          <Modal>

            <InformationComponent carpeta={carpeta} />

            <hr />
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

            <section className={layout.segmentColumn}>
              <h5 className={typography.titleMedium}>Capital Adeudado:</h5>
              <MoneyFixer valor={ Number(
                demanda.capitalAdeudado
              ) } className={ typography.bodyMedium} />

            </section>
            { idProcesoContent }
          </Modal>
        </CarpetaFormProvider>

      );
}
