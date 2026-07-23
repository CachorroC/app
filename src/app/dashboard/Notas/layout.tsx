import styles from '#@/styles/layout.module.css';
import { ReactNode } from 'react';
import { NotasSortProvider } from '../../Context/notas-sort-context';
import { getNotas } from '#@/lib/project/utils/Notas/getNotas';
import { NuevaNotaFormProvider } from './nueva-nota-form-context';
import { connection } from 'next/server';
import { FilterDrawer,
  FilterDrawerButton, } from '#@/components/layout/FilterDrawer';

const RIGHT_DRAWER_ID = 'notas-panel';

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
        <div className={styles.top}>
          {top}
          <FilterDrawerButton id={RIGHT_DRAWER_ID} />
        </div>
        <div className={styles.leftGrid}>{children}</div>
        <FilterDrawer id={RIGHT_DRAWER_ID}>{right}</FilterDrawer>
      </NuevaNotaFormProvider>
    </NotasSortProvider>
  );
}
