import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.css';

type ButtonVariant = 'filled' | 'tonal' | 'elevated' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = {
  children     : ReactNode;
  variant?     : ButtonVariant;
  size?        : ButtonSize;
  icon?        : ReactNode;
  trailingIcon?: ReactNode;
  fullWidth?   : boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export const Button = ( {
  children,
  variant = 'filled',
  size = 'medium',
  icon,
  trailingIcon,
  fullWidth = false,
  type = 'button',
  className,
  ...rest
}: ButtonProps ) => {
  const classes = [
    styles.root,
    styles[ variant ],
    styles[ size ],
    ( icon || trailingIcon ) && styles.withIcon,
    fullWidth && styles.fullWidth,
    className,
  ].filter( Boolean )
    .join( ' ' );

  return (
    <button type={type} className={classes} {...rest}>
      <span className={styles.overlay} aria-hidden="true" />
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <span className={styles.label}>{children}</span>
      {trailingIcon && <span className={styles.icon} aria-hidden="true">{trailingIcon}</span>}
    </button>
  );
};
