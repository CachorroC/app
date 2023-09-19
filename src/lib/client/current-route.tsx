'use client';

import { usePathname,
         useSelectedLayoutSegment,
         useSelectedLayoutSegments, } from 'next/navigation';
import { Fragment } from 'react';

export function CurrentRoute(
            {
              slice = 2
            }: { slice?: number }
) {
  const pathname = usePathname();

  const segment = useSelectedLayoutSegments(
    'right'
  );

  return (
    <Fragment>
      {pathname.replace(
        '/', ' '
      )}
      {segment.map(
        (
          seg
        ) => {
          return (
            <div key={seg}>
              <h1>{seg}</h1>
            </div>
          );
        }
      )}
    </Fragment>
  );
}
