import { ReactNode } from 'react';
import { Button } from '#@/components/ds/button';
import styles from './success-state.module.css';

type SuccessStateProps = {
  icon : string;
  title: string;
  body : ReactNode;
  cta  : string;
  onCta: () => void;
};

export const SuccessState = ( {
  icon, title, body, cta, onCta
}: SuccessStateProps ) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.badge}>
        <span
          className={`material-symbols-rounded ${ styles.badgeIcon }`}
          style={{
            fontVariationSettings: '\'FILL\' 1' 
          }}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>{body}</div>
      <Button variant="text" onClick={onCta}>{cta}</Button>
    </div>
  );
};
