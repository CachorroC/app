'use client';
import { useCategory } from '#@/app/Context/category-context';
import { CarpetasTable } from '#@/components/Carpetas/client/carpetasList';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Page( {
  params: {
    categoria 
  },
}: {
  params: { categoria: string };
} ) {
  const {
    setCurrentCategory 
  } = useCategory();

  if ( categoria === 'todos' ) {
    redirect( '/Carpetas' );
  }

  useEffect(
    () => {
      setCurrentCategory( categoria );

      return () => {};
    }, [
      categoria,
      setCurrentCategory
    ] 
  );

  return (
    <>
      <CarpetasTable />
    </>
  );
}
