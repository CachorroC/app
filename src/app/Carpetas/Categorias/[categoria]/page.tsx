'use client';
import { useCategory } from '#@/app/context/category-context';
import { CarpetasList } from '#@/components/Carpetas/client/carpetasList';
import { useEffect } from 'react';

export default function Page(
  {
    params: {
      categoria 
    },
  }: {
    params: { categoria: string };
  } 
) {
      const {
        setCurrentCategory 
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
                  setCurrentCategory(
                    categoria 
                  );

                  return () => {};
        }, [
          categoria,
          setCurrentCategory 
        ] 
      );

      return (
        <>
          <CarpetasList />
        </>
      );
}
