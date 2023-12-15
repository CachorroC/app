import styles from '#@/styles/layout.module.css';
import { ReactNode } from 'react';
import { NuevaCarpetaFormProvider } from '../context/nueva-carpeta-form-context';
import { Metadata } from 'next';
import { CarpetasSortProvider } from '../context/carpetas-sort-context';
import getCarpetas from '#@/lib/project/utils/Carpetas/getCarpetas';

export const metadata: Metadata = {
  title: 'Carpetas',

};

export default async function LayoutProcesosMain(
  {
    children,
    top,
    right,
  }: {
    children: ReactNode;
    top: ReactNode;
    right: ReactNode;
  }
) {
      const carpetas = await getCarpetas();
      return (
        <>
          <CarpetasSortProvider  initialCarpetas={carpetas}>
            <NuevaCarpetaFormProvider>
              <div className={styles.top}>{top}</div>
              <div className={styles.leftGrid}>{children}</div>
              <div className={styles.right}>{right}</div>
            </NuevaCarpetaFormProvider>
          </CarpetasSortProvider>
        </>
      );
}
