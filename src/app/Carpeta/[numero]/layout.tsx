import { CarpetaFormProvider } from '#@/app/context/carpeta-form-context';
import { Loader } from '#@/components/Loader';
import { NombreComponent } from '#@/components/nombre';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import styles from '#@/styles/layout.module.css';
import { Route } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import { NotasLinkList } from './notas-list';
import { prisma } from '#@/lib/connection/prisma';

type Props = {
  children: ReactNode;
  top: ReactNode;
  right: ReactNode;
  params: { numero: string };
};

export default async function LayoutCarpetaMain(
  {
    children,
    top,
    right,
    params,
  }: Props 
) {
      await prisma.carpeta.update(
        {
          where: {
            numero: Number(
              params.numero 
            ),
          },
          data: {
            revisado: true,
          },
        } 
      );

      const carpeta = await getCarpetabyNumero(
        Number(
          params.numero 
        ) 
      );

      if ( !carpeta ) {
        return notFound();
      }

      return (
        <>
          <CarpetaFormProvider
            key={params.numero}
            carpeta={carpeta}
          >
            {carpeta.nombre}
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
              {top}
            </div>
            <div className={styles.leftColumn}>{children}</div>
            <div className={styles.right}>
              {right}
              <NotasLinkList
                carpetaNumero={Number(
                  params.numero 
                )}
                key={params.numero}
              />
            </div>
          </CarpetaFormProvider>
        </>
      );
}
