import { CarpetaFormProvider } from '#@/app/Context/carpeta-form-context';
import { Loader } from '#@/components/Loader';
import { NombreComponent } from '#@/components/nombre';
import styles from '#@/styles/layout.module.css';
import { Route } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { ForwardBackwardNavButtons } from '#@/components/Buttons/nav-buttons';

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
                    key={params.numero}
                    deudor={carpeta.deudor}
                  />
                )}
              </Link>
            </Suspense>
            <Suspense fallback={<Loader />}>{top}</Suspense>
            <Suspense fallback={<Loader />}>
              <ForwardBackwardNavButtons />
            </Suspense>
          </div>
          <div className={styles.leftColumn}>
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </div>
          <div className={styles.right}>
            <Suspense fallback={<Loader />}>{right}</Suspense>
          </div>
        </CarpetaFormProvider>
      );
}
