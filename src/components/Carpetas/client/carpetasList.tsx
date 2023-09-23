'use client';
import { LinkCard } from '#@/components/layout/search/link';
import { useCarpetaSort } from '#@/app/context/carpetas-sort-context';


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
          <LinkCard
            path={path}
            carpeta={proceso}
            key={proceso._id}
          />
        );

      }
    )}</>;
}
