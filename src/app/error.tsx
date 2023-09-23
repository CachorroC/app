'use client';
import styles from '#@/components/Card/card.module.css';
import { useEffect } from 'react';
import typography from '#@/styles/fonts/typography.module.scss';

export default function Error(
  {
    error,
    reset,
  }: {
  error: Error & { digest?: string };
  reset: () => void;
}
) {
  useEffect(
    () => {
      // Log the error to an error reporting service
      console.error(
        error
      );
    }, [
      error
    ]
  );

  return (
    <div className={styles.errorContainer}>
      <h2 className={typography.displayLarge}>{error.name}</h2>
      <p className={typography.bodyMedium}>{error.message}</p>
      <span>{error.digest}</span>
      <button
        className={styles.error}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            return reset();
          }
        }
      >
        Try again
      </button>
    </div>
  );
}
