import styles from '#@/styles/layout.module.css';
import { ReactNode, Suspense } from 'react';
import { NuevaCarpetaFormProvider } from '../Context/nueva-carpeta-form-context';
import { Metadata } from 'next';
import { CarpetasSortProvider } from '../Context/carpetas-sort-context';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { TableRowCarpetaSortingButton } from '#@/components/Carpetas/client/carpetasButtonsSort';
import { ForwardBackwardNavButtons } from '#@/components/Buttons/nav-buttons';
import { InputSearchBar } from '#@/components/layout/InputSearchBar';
import { Loader } from '#@/components/Loader';

/*
export const revalidate = 86400; // revalidate the data at most every hour
 */
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
            <div className={ styles.top }>
              <Suspense fallback={<Loader />}>
                <InputSearchBar carpetas={ carpetas} />
                <ForwardBackwardNavButtons />
              </Suspense>
              {top}

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
