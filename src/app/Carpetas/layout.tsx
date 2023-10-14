import styles from '#@/styles/layout.module.css';
import { ReactNode } from 'react';
import { NuevaCarpetaFormProvider } from '../context/nueva-carpeta-form-context';

export default function LayoutProcesosMain(
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
      <NuevaCarpetaFormProvider>
        <div className={styles.top}>{top}</div>
        <div className={styles.leftColumn}>{children}</div>
        <div className={styles.right}>{right}</div>
      </NuevaCarpetaFormProvider>
    </>
  );
}
