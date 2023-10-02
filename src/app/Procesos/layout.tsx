import styles from '#@/styles/layout.module.css';
import { ReactNode } from 'react';

export const dynamic = 'force-dynamic';

export const dynamicParams = true;

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