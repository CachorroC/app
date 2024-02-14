import styles from '#@/styles/layout.module.css';
import { ReactNode } from 'react';
import { NuevaCarpetaFormProvider } from '../Context/nueva-carpeta-form-context';
import { Metadata } from 'next';
import { CarpetasSortProvider } from '../Context/carpetas-sort-context';
import getCarpetas from '#@/lib/project/utils/Carpetas/getCarpetas';
import { ResetButtonSorter } from './UltimasActuaciones/reset-button';

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
        <CarpetasSortProvider initialCarpetas={carpetas}>
          <NuevaCarpetaFormProvider>
            <div className={styles.top}>
              {top}
              <ResetButtonSorter carpetas={carpetas} />
            </div>
            <div className={styles.leftGrid}>{children}</div>
            <div className={styles.right}>{right}</div>
          </NuevaCarpetaFormProvider>
        </CarpetasSortProvider>
      );
}
