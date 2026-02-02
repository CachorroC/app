import { CarpetaFormProvider } from '#@/app/Context/carpeta-form-context';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export async function generateMetadata( {
  params,
}: {
  params: Promise<{ numero: string }>;
} ): Promise<Metadata> {
  const {
    numero
  } = await params;

  const product = await getCarpetabyNumero( Number( numero ) );

  return {
    title: `${ numero } - ${ product.nombre }`,

    keywords: [
      product.nombre,
      product.tipoProceso,
      product.numero.toString(),
      product.tipoProceso,
      product.category,
    ],
  };
}

export default async function Layout( {
  params,
  children,
}: {
  params  : Promise<{ numero: string; idProceso: string }>;
  children: ReactNode;
} ) {
  const {
    numero, idProceso 
  } = await params;

  if ( idProceso === 'idProceso' ) {
    return notFound();
  }

  const carpeta = await getCarpetabyNumero( Number( numero ) );

  return (
    <CarpetaFormProvider
      key={numero}
      carpeta={carpeta}
    >
      {children}
    </CarpetaFormProvider>
  );
}
