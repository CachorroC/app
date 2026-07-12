import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import styles from './text-field.module.css';

interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className'
> {
  label        : string;
  error?       : string;
  helperText?  : string;
  leadingIcon? : ReactNode;
  requiredMark?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>( function TextField(
  {
    label,
    error,
    helperText,
    leadingIcon,
    requiredMark,
    id,
    disabled,
    ...rest
  },
  ref,
) {
  const errorId = error
    ? `${ id }-error`
    : undefined;
  const helperId = !error && helperText
    ? `${ id }-help`
    : undefined;

  return (
    <div className={styles.field}>
      <label
        htmlFor={id}
        className={`${ styles.label } ${ error
          ? styles.labelError
          : '' }`}
      >
        {label}
        {requiredMark
          ? (
              <span className={styles.requiredMark}> *</span>
            )
          : null}
      </label>
      <span
        className={`${ styles.inputWrapper } ${
          error
            ? styles.inputWrapperError
            : ''
        } ${ disabled
          ? styles.inputWrapperDisabled
          : '' }`}
      >
        {leadingIcon
          ? (
              <span
                className={styles.leadingIcon}
                aria-hidden
              >
                {leadingIcon}
              </span>
            )
          : null}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          className={styles.input}
          aria-invalid={!!error}
          aria-describedby={errorId ?? helperId}
          {...rest}
        />
      </span>
      {error
        ? (
            <div
              id={errorId}
              className={styles.error}
            >
              {error}
            </div>
          )
        : null}
      {!error && helperText
        ? (
            <div
              id={helperId}
              className={styles.helper}
            >
              {helperText}
            </div>
          )
        : null}
    </div>
  );
}, );
