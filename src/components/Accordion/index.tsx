'use client';
import { ReactNode, useState } from 'react';
import styles from './accordion.module.css';

export function Accordion(
            {
              children 
            }: { children: ReactNode } 
) {
  const [
    isActive,
    setIsActive
  ] = useState(
    false 
  );

  return (
    <div className={`${ styles.accordion } ${ isActive && styles.isActive }`}>
      <div className={styles.item}>
        <button
          type="button"
          className={styles.title}
          onClick={() => {
            setIsActive(
              !isActive 
            );
          }}
        >
          <span className="material-symbols-outlined">
            {isActive
              ? 'expand_less'
              : 'expand_more'}
          </span>
        </button>
        {isActive && <div className={styles.content}>{children}</div>}
      </div>
    </div>
  );
}
