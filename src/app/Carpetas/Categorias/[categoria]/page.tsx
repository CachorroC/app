'use client';
import { useCategory } from '#@/app/Context/category-context';
import { CarpetasTable } from '#@/components/Carpetas/client/carpetasList';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default async function Page( {
  params
}: {
  params: Promise<{ categoria: string }>;
  } ) {
  const {
    categoria 
  } = await params;

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
