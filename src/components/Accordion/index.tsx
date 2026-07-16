'use client';
import { ReactNode, useState } from 'react';
import styles from './accordion.module.css';

export function Accordion( {
  title,
  children,
}: { title?: string; children: ReactNode } ) {
  const [
    isActive,
    setIsActive
  ] = useState( false );

  return (
    <div className={`${ styles.accordion } ${ isActive && styles.isActive }`}>
      <div className={styles.item}>
        <button
          type="button"
          className={styles.title}
          aria-expanded={isActive}
          onClick={() => {
            setIsActive( !isActive );
          }}
        >
          {title
            ? <span>{title}</span>
            : null}
          <span
            className="material-symbols-outlined"
            aria-hidden
          >
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
