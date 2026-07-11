import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import styles from './button.module.css';

export type ButtonVariant = 'filled' | 'tonal' | 'elevated' | 'outlined' | 'text';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant;
  size?   : 'small' | 'medium';
  icon?   : ReactNode;
  children: ReactNode;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  filled  : styles.filled,
  tonal   : styles.tonal,
  elevated: styles.elevated,
  outlined: styles.outlined,
  text    : styles.text,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>( function Button(
  {
    variant = 'filled', size = 'medium', icon, children, type = 'button', ...rest
  }, ref 
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
        ? <span className={styles.icon} aria-hidden>{icon}</span>
        : null}
      {children}
    </button>
  );
} );
