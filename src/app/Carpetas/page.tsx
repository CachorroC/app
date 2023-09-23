import { Card } from 'components/Card';
import { carpetasCollection } from '#@/lib/connection/mongodb';
import { carpetaConvert } from 'types/carpetas';
import { Sort } from 'mongodb';
import layout from '#@/styles/layout.module.css';

export default async function Page(
  {
    searchParams,
  }: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
) {

  const collection = await carpetasCollection();

  console.log(
    searchParams
  );

  const carpetas = await collection
    .find(
      {}
    )
    .sort(
 searchParams as Sort
    )
    .toArray();

  return (
    <div className={layout.left}>
      {carpetas.map(
        (
          carpeta
        ) => {
          const carpetaC = carpetaConvert.toMonCarpeta(
            carpeta
          );

          return (
            <Card
              key={carpetaC._id}
              path={'/Procesos'}
              carpeta={carpetaC}
            >
              <p>{carpeta.llaveProceso}</p>
            </Card>
          );
        }
      )}
    </div>
  );
}
