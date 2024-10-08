'use client';

import { errorContainer } from '#@/components/Card/card.module.css';
import { useEffect } from 'react';

export default function Error( {
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
} ) {
  useEffect(
    () => {
      console.error( error );
    }, [
      error
    ] 
  );

  return (
    <div className={errorContainer}>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <span>{error.digest}</span>
      <button
        onClick={() => {
          return reset();
        }}
      >
        Try again
      </button>
    </div>
  );
}
