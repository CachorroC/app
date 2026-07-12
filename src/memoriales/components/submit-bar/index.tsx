'use client';

import { Icon } from '#@/components/ui';
import { Button } from '../ui/button';
import styles from './submit-bar.module.css';

interface SubmitBarProps {
  disabled?  : boolean;
  submitLabel: string;
  onReset    : () => void;
}

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
