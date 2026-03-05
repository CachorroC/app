import styles from '#@/styles/layout.module.css';
import { ReactNode, Suspense } from 'react';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { TableProvider } from '../Context/TableContext';
import { connection } from 'next/server';
import { Loader } from '#@/components/Loader/main-loader';

export default async function LayoutProcesosMain({
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
  await connection();
  const carpetas = await getCarpetas();

  return (
    <Suspense fallback={<Loader />}>
      <TableProvider initialData={carpetas}>
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
      </TableProvider>
    </Suspense>
  );
}
