import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './switch.module.css';

/** Props for `Switch` — native `<input>` attributes minus `type` and `className`, since both are fixed internally. */
type SwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'className'
>;

/**
 * Styled toggle-switch built on a native `role="switch"` checkbox, with
 * decorative track/thumb spans; used by `BooleanField` for boolean manifest
 * fields.
 *
 * @param props - See {@link SwitchProps}.
 * @param ref - Forwarded to the underlying checkbox `<input>` element.
 */
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
