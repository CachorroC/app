'use client';
import { useMemo, useState } from 'react';

export function usePrettyPrintedState() {
      const [
        value,
        setValue
      ] = useState();

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
