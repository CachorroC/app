import styles from '#@/styles/layout.module.css';
import { ReactNode, Suspense } from 'react';
import { NuevaCarpetaFormProvider } from '../Context/nueva-carpeta-form-context';
import { CarpetasSortProvider } from '../Context/carpetas-sort-context';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { Loader } from '#@/components/Loader/main-loader';
import { connection } from 'next/server';

async function LayoutAsyncProcess({ children }: { children: ReactNode }) {
  await connection();

  const carpetas = await getCarpetas();

  return (
    <CarpetasSortProvider initialCarpetas={carpetas}>
      {children}
    </CarpetasSortProvider>
  );
}

export default function LayoutProcesosMain({
  children,
  top,
  right,
  modal,
}: {
  children: ReactNode;
  top: ReactNode;
  right: ReactNode;
  modal: ReactNode;
}) {
  return (
    <Suspense fallback={<Loader />}>
      <LayoutAsyncProcess>
        <NuevaCarpetaFormProvider>
          <Suspense fallback={<Loader />}>{modal}</Suspense>
          <Suspense fallback={<Loader />}>
            <div className={styles.top}>{top}</div>
          </Suspense>
          <Suspense fallback={<Loader />}>
            <div className={styles.leftGrid}>{children}</div>
          </Suspense>
          <Suspense fallback={<Loader />}>
            <div className={styles.right}>{right}</div>
          </Suspense>
        </NuevaCarpetaFormProvider>
      </LayoutAsyncProcess>
    </Suspense>
  );
}
