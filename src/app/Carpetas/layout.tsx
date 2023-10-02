import styles from '#@/styles/layout.module.css';
import { ReactNode } from 'react';


export default function LayoutProcesosMain (
  {
    children, top
  }: { children: ReactNode; top: ReactNode }
) {
  return (
    <>
      <div className={ styles.top }>
        {top}
      </div>
      <div className={ styles.left }>
        {children}
      </div>
    </>
  );
}