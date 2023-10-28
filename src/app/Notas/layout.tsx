
import styles from '#@/styles/layout.module.css';
import { ReactNode } from 'react';
import { NuevaNotaFormProvider } from '../context/nueva-nota-form-context';

export default function NotasLayoutMain(
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
  return (
    <>
      <NuevaNotaFormProvider>
        <div className={styles.top}>{top}</div>
        <div className={styles.leftGrid}>{children}</div>
        <div className={ styles.right }>{ right }</div>
      </NuevaNotaFormProvider>
    </>
  );
}
