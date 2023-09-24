'use client';
import { LinkCard } from '#@/components/layout/search/link';
import { useCarpetaSort } from '#@/app/context/carpetas-sort-context';
import { Card } from '#@/components/Card';


export default function CarpetasList(
  {
    path,
  }: {
  path: string;
}
) {


  const  carpetasReduced= useCarpetaSort();



  return <>

    { carpetasReduced.map(

      (
        proceso
      ) => {

        return (
          <Card key={ proceso._id } path={path} carpeta={ proceso } >
            <LinkCard
              path={path}
              carpeta={proceso}
              key={proceso._id}
            />
          </Card>
        );

      }
    )}</>;
}
