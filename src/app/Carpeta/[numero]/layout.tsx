import { CarpetaFormProvider } from '#@/app/Context/carpeta-form-context';
import { Loader } from '#@/components/Loader';
import { NombreComponent } from '#@/components/nombre';
import styles from '#@/styles/layout.module.css';
import { Metadata, Route } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { ForwardBackwardNavButtons } from '#@/components/Buttons/nav-buttons';
import { ExpedienteFormComponent } from './expediente-form-component';

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

export default async function LayoutCarpetaMain(
  {
    children,
    top,
    right,
    params,
  }: {
    children: ReactNode;
    top: ReactNode;
    right: ReactNode;
    params: { numero: string };
  }
) {
      const carpeta = await getCarpetabyNumero(
        Number(
          params.numero
        )
      );

      if ( !carpeta ) {
        return notFound();
      }

      return (
        <CarpetaFormProvider
          key={params.numero}
          carpeta={carpeta}
        >
          <div className={styles.top}>
            <Suspense fallback={<Loader />}>
              <Link href={`/Carpeta/${ params.numero }` as Route}>
                {carpeta.deudor && (
                  <NombreComponent
                    key={ params.numero }
                    primerNombre={ carpeta.deudor.primerNombre }
                    primerApellido={ carpeta.deudor.primerApellido }
                    segundoApellido={ carpeta.deudor.segundoApellido }
                    segundoNombre={ carpeta.deudor.segundoNombre }
                  />
                )}
              </Link>
            </Suspense>
            <Suspense fallback={<Loader />}>{top}</Suspense>
            <Suspense fallback={<Loader />}>
              <ForwardBackwardNavButtons />
            </Suspense>
          </div>
          <div className={ styles.left }>

            <Suspense fallback={<Loader />}>{children}</Suspense>
          </div>
          <div className={ styles.right }>

            <Suspense fallback={ <Loader /> }>{ right }</Suspense>
            <ExpedienteFormComponent initialLLave={ carpeta.llaveProceso } numero={ Number(
              params.numero
            ) } />
          </div>
        </CarpetaFormProvider>
      );
}
