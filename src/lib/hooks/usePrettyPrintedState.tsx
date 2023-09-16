'use client';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

export function usePrettyPrintedState<T extends object>(): [
  JSX.Element,
  Dispatch<SetStateAction<T | undefined>>,
  ] {
  const [
    value,
    setValue
  ] = useState<T>();

  const resultValue = useMemo(
    () => {
      return (
        <>
          {value && (
            <pre>
            Value:
              <br />
              {JSON.stringify(
                value, null, 2 
              )}
            </pre>
          )}
        </>
      );
    }, [
      value
    ] 
  );

  return [
    resultValue,
    setValue
  ];
}
