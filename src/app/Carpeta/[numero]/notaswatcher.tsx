'use client';

import { Nota } from '@prisma/client';
import { useParams, useSelectedLayoutSegments } from 'next/navigation';
import { Control,  useWatch } from 'react-hook-form';

export function NotasWatcher (
  {
    control
  }: {control: Control<Nota, any>}
) {
  const params = useParams();

  const segments = useSelectedLayoutSegments();



  const results = useWatch(
    {
      control
    }
  );
  return (
    <pre>
      {JSON.stringify(
        {
          ...results,
          params  : params,
          segments: segments,
        }, null, 2
      )}
    </pre>
  );
}