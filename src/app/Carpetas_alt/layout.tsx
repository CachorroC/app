import styles from '#@/styles/layout.module.css';
import { ReactNode } from 'react';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { TableProvider } from '../Context/TableContext';


export default async function LayoutProcesosMain( {
  children,
  top,
  right,
  modal,
}: {
  children: ReactNode;
  top     : ReactNode;
  right   : ReactNode;
  modal   : ReactNode;
} ) {
  const carpetas = await getCarpetas();

  return (
    <TableProvider initialData={carpetas}>


      {modal}
      <div className={styles.top}>{top}</div>
      <div className={styles.leftGrid}>{children}</div>
      <div className={styles.right}>{right}</div>

    </TableProvider>
  );
}
