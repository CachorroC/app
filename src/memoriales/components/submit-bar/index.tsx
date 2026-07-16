'use client';

import { Icon } from '#@/components/ui';
import { Button } from '../ui/button';
import styles from './submit-bar.module.css';

/**
 * Props for `SubmitBar` — whether the form actions are disabled, the label
 * shown on the submit button, and the callback for the "Limpiar campos"
 * reset button.
 */
interface SubmitBarProps {
  disabled?  : boolean;
  submitLabel: string;
  onReset    : () => void;
}

/**
 * Renders the memorial form's action row: a submit button with a dynamic
 * label plus a "Limpiar campos" button that resets the form.
 *
 * @param props - See {@link SubmitBarProps}.
 */
export function SubmitBar( {
  disabled, submitLabel, onReset 
}: SubmitBarProps ) {
  return (
    <div className={styles.bar}>
      <Button
        type="submit"
        variant="filled"
        disabled={disabled}
        icon={
          <Icon
            name="description"
            size={18}
          />
        }
      >
        {submitLabel}
      </Button>
      <Button
        type="button"
        variant="outlined"
        disabled={disabled}
        onClick={onReset}
      >
        Limpiar campos
      </Button>
    </div>
  );
}
