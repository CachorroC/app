import styles from '#@/styles/layout.module.css';
import { ReactNode } from 'react';
import { NuevaCarpetaFormProvider } from '../Context/nueva-carpeta-form-context';
import { CarpetasSortProvider } from '../Context/carpetas-sort-context';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';


export default async function LayoutProcesosMain(
  {
    children,
    top,
    right,
    modal,
  }: {
    children: ReactNode;
    top: ReactNode;
    right: ReactNode;
    modal: ReactNode;
  }
) {
  const carpetas = await getCarpetas();

  return (
    <CarpetasSortProvider initialCarpetas={carpetas}>
      <NuevaCarpetaFormProvider>
        {modal}
        <div className={styles.top}>{top}</div>
        <div className={styles.leftGrid}>{children}</div>
        <div className={styles.right}>{right}</div>
      </NuevaCarpetaFormProvider>
    </CarpetasSortProvider>
  );
}
