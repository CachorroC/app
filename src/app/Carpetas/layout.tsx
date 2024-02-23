import styles from '#@/styles/layout.module.css';
import { ReactNode } from 'react';
import { NuevaCarpetaFormProvider } from '../Context/nueva-carpeta-form-context';
import { Metadata } from 'next';
import { CarpetasSortProvider } from '../Context/carpetas-sort-context';
import getCarpetas from '#@/lib/project/utils/Carpetas/getCarpetas';
import { ResetButtonSorter } from './UltimasActuaciones/reset-button';
import { TableRowCarpetaSortingButton } from '#@/components/Carpetas/client/carpetasButtonsSort';

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
            <div className={ styles.leftGrid }>
              <table>
                <thead>
                  <tr>
                    <TableRowCarpetaSortingButton sortKey={'numero'} />
                    <TableRowCarpetaSortingButton sortKey={'nombre'} />
                    <TableRowCarpetaSortingButton sortKey={'fecha'} />
                    <TableRowCarpetaSortingButton sortKey={'category'} />
                    <th>Actuaciones</th>
                    <th>Revisado</th>
                    <th>expediente</th>
                  </tr>
                </thead>
                <tbody>
                  {children}
                </tbody>
              </table>
            </div>
            <div className={styles.right}>{right}</div>
          </NuevaCarpetaFormProvider>
        </CarpetasSortProvider>
      );
}
