import { Card } from '../../components/Card';
import { Loader } from '#@/components/Loader';
import getCarpetas from '#@/lib/project/getCarpetas';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { FechaActuacionComponent } from 'components/Actuacion/server-components';
import layout from '#@/styles/layout.module.css';
import { CategoryFilterButton } from 'components/Buttons/FilteringButtons';
import typography from '#@/styles/fonts/typography.module.scss';

export const dynamic = 'force-dynamic';

export const dynamicParams = true;

export const metadata: Metadata = {
  title: 'Procesos',
};

export default async function Procesos() {
  const carpetasRaw = await getCarpetas();

  const carpetas = [
            ...carpetasRaw
  ].sort(
    (
      a, b
    ) => {

      if ( !a.fecha || a.fecha === undefined ) {
        return 1;
      }

      if ( !b.fecha || b.fecha === undefined ) {
        return -1;
      }

      const x = a.fecha.toISOString();

      const y = b.fecha.toISOString();

      if ( x < y ) {
        return 1;
      }

      if ( x > y ) {
        return -1;
      }

      return 0;
    }
  );

  return (

    <><div className={ layout.top }>
      <h1 className={ typography.displayLarge }>Procesos</h1>
      <CategoryFilterButton />
    </div><div className={ layout.left }>
      { carpetas.map(
        (
          carpeta, index
        ) => {

          return (
            <Card
              path={ '/Procesos' }
              carpeta={ carpeta }
              key={ carpeta._id }
            >
              <Suspense fallback={ <Loader key={ carpeta._id } /> }>
                <FechaActuacionComponent
                  carpeta={ carpeta }
                  key={ carpeta._id }
                  index={ index } />
              </Suspense>
            </Card>
          );
        }
      ) }
    </div></>
  );
}
