import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import styles from './button.module.css';

/** Visual style of the `Button` primitive, following Material Design's button variant naming. */
export type ButtonVariant =
  'filled' | 'tonal' | 'elevated' | 'outlined' | 'text';

/**
 * Props for the `Button` primitive — the native button attributes (minus
 * `className`) plus `variant`, `size`, and an optional leading `icon`.
 */
interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> {
  variant?: ButtonVariant;
  size?   : 'small' | 'medium';
  icon?   : ReactNode;
  children: ReactNode;
}

/** Maps each `ButtonVariant` to its CSS module class name. */
const VARIANT_CLASS: Record<ButtonVariant, string> = {
  filled  : styles.filled,
  tonal   : styles.tonal,
  elevated: styles.elevated,
  outlined: styles.outlined,
  text    : styles.text,
};

/**
 * Generic, ref-forwarding Material-style button primitive with variant/size
 * classes and an optional leading icon; the base building block for buttons
 * throughout the memoriales feature.
 *
 * @param props - See {@link ButtonProps}.
 * @param ref - Forwarded to the underlying `<button>` element.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>( function Button(
  {
    variant = 'filled',
    size = 'medium',
    icon,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const sizeClass = size === 'small'
    ? styles.small
    : '';

  return (
    <button
      ref={ref}
      type={type}
      className={`${ styles.button } ${ VARIANT_CLASS[ variant ] } ${ sizeClass }`}
      {...rest}
    >
      {icon
        ? (
            <span
              className={styles.icon}
              aria-hidden
            >
              {icon}
            </span>
          )
        : null}
      {children}
    </button>
  );
}, );
