import { NotasSortButtons } from '#@/components/Nota/client/nota-sort-buttons';
import styles from '#@/styles/layout.module.css';
import { ReactNode } from 'react';
import typography from '#@/styles/fonts/typography.module.css';
import { button, icon, text } from '#@/components/Buttons/buttons.module.css';
import type { Route } from 'next';
import Link from 'next/link';
import { NuevaNotaFormProvider } from '../context/nueva-nota-form-context';

export default function NotasLayoutMain(
  {
    children,
    right,
  }: {
  children: ReactNode;
  right: ReactNode;
}
) {
  return (
    <>
      <NuevaNotaFormProvider>
        <div className={styles.top}>
          <h1 className={typography.displayLarge}>{'Notas'}</h1>
          <NotasSortButtons />
          <Link
            className={button}
            href={'/Notas/Nueva' as Route}
          >
            <p className={text}>{'Nueva Nota'}</p>
            <span className={`material-symbols-outlined ${ icon }`}>note_alt</span>
          </Link>
        </div>
        <div className={styles.left}>{children}</div>
        <div className={ styles.right }>{ right }</div>
      </NuevaNotaFormProvider>
    </>
  );
}
