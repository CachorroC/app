import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './icon-button.module.css';

type IconButtonVariant = 'standard' | 'filled' | 'tonal' | 'outlined';
type IconButtonSize = 'small' | 'medium' | 'large';

export type IconButtonProps = {
  children : ReactNode;
  variant? : IconButtonVariant;
  size?    : IconButtonSize;
  selected?: boolean;
  ariaLabel: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'>;

export const IconButton = ( {
  children,
  variant = 'standard',
  size = 'medium',
  selected = false,
  ariaLabel,
  className,
  ...rest
}: IconButtonProps ) => {
  const classes = [
    styles.root,
    styles[ variant ],
    styles[ size ],
    className,
  ].filter( Boolean )
    .join( ' ' );

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={selected}
      className={classes}
      {...rest}
    >
      <span className={styles.overlay} aria-hidden="true" />
      <span className={styles.icon} aria-hidden="true">{children}</span>
    </button>
  );
};
