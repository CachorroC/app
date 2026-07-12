import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './switch.module.css';

type SwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'className'
>;

export const Switch = forwardRef<HTMLInputElement, SwitchProps>( function Switch(
  props, ref 
) {
  return (
    <span className={styles.wrapper}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className={styles.input}
        {...props}
      />
      <span
        className={styles.track}
        aria-hidden
      >
        <span className={styles.thumb} />
      </span>
    </span>
  );
}, );
