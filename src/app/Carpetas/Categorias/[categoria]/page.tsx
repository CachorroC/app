'use client';
import { useCarpetaSort } from '#@/app/context/carpetas-sort-context';
import { useCategory } from '#@/app/context/main-context';
import { NewCarpetasList } from '#@/components/Carpetas/client/carpetasList';
import { useEffect } from 'react';

export default function Page(
  {
    params,
  }: {
    params: { categoria: string };
  }
) {
      const carpetas = useCarpetaSort();

      const {
        setCategory
      } = useCategory();
      /*
  const ncarps = [
    ...carpetasRaw
  ].filter(
    (
      carpeta
    ) => {
      return carpeta.category === params.categoria;
    }
  );
 */
      useEffect(
        () => {
                  setCategory(
                    params.categoria
                  );

                  return () => {
                  };
        }, [
          params.categoria,
          setCategory
        ]
      );

      return (
        <>
          <NewCarpetasList carpetas={carpetas}/>
        </>
      );
}
