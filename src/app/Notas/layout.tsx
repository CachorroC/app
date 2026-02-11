import styles from '#@/styles/layout.module.css';
import { ReactNode } from 'react';
import { NotasSortProvider } from '../Context/notas-sort-context';
import { getNotas } from '#@/lib/project/utils/Notas/getNotas';
import { NuevaNotaFormProvider } from './nueva-nota-form-context';
import { connection } from 'next/server';



export default async function NotasLayoutMain( {
  children,
  top,
  right,
}: {
  children: ReactNode;
  top     : ReactNode;
  right   : ReactNode;
} ) {
  await connection();
  const notas = await getNotas();

  return (
    <NotasSortProvider notas={notas}>
      <NuevaNotaFormProvider>
        <div className={styles.top}>{top}</div>
        <div className={styles.leftGrid}>{children}</div>
        <div className={styles.right}>{right}</div>
      </NuevaNotaFormProvider>
    </NotasSortProvider>
  );
}
