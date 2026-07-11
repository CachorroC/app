import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './icon-button.module.css';

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children    : ReactNode;
  'aria-label': string;
}

export function IconButton( {
  children, type = 'button', ...rest
}: IconButtonProps ) {
  return (
    <button type={type} className={styles.iconButton} {...rest}>
      {children}
    </button>
  );
}
