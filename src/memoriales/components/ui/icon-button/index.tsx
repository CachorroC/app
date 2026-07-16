import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './icon-button.module.css';

/**
 * Props for `IconButton` — native button attributes (minus `className`)
 * with required `children` (the icon content) and a required `aria-label`,
 * since an icon-only button has no accessible name otherwise.
 */
interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> {
  children    : ReactNode;
  'aria-label': string;
}

/**
 * Icon-only button that requires an `aria-label` — used e.g. for the
 * delete-anexo row action in `StringListField`.
 *
 * @param props - See {@link IconButtonProps}.
 */
export function IconButton( {
  children,
  type = 'button',
  ...rest
}: IconButtonProps ) {
  return (
    <button
      type={type}
      className={styles.iconButton}
      {...rest}
    >
      {children}
    </button>
  );
}
