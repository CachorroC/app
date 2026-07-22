import { ReactNode } from 'react';
import { MobileLogo } from './mobile-logo';
import styles from './auth-panel-shell.module.css';

export const AuthPanelShell = ( {
  children 
}: { children: ReactNode } ) => {
  return (
    <div className={styles.formPanel}>
      <div className={styles.formInner}>
        <MobileLogo />
        {children}
      </div>
    </div>
  );
};
