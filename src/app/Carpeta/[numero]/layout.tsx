import { CarpetaFormProvider } from '#@/app/context/carpeta-form-context';
import styles from '#@/styles/layout.module.css';
import { ReactNode } from 'react';

export default function LayoutProcesosMain(
  {
    children,
    top, right, params
  }: {
  children: ReactNode;
      top: ReactNode;
  right: ReactNode;params: {numero:string}
}
) {
  return (
    <>
      <CarpetaFormProvider  numero={params.numero }>
        <div className={styles.top}>{top}</div>
        <div className={styles.leftColumn}>{children}</div>
        <div className={ styles.right }>{ right }</div>
      </CarpetaFormProvider>
    </>
  );
}
