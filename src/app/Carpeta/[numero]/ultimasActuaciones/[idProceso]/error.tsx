'use client';

import { errorContainer } from '#@/components/Card/card.module.css';
import { useEffect } from 'react';

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
    <div className={errorContainer}>
      <h2>No pudimos obtener estas acruaciones.</h2>
      <p>{error.message}</p>
      <span>{error.digest}</span>
      <button
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
