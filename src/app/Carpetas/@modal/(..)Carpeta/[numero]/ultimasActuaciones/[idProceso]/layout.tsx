import { CarpetaFormProvider } from '#@/app/Context/carpeta-form-context';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export async function generateMetadata( {
  params,
}: {
  params: { numero: string };
} ): Promise<Metadata> {
  const {
    numero 
  } = params;

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
  params: { numero: string; idProceso: string };
  children: ReactNode;
} ) {
  if ( params.idProceso === 'idProceso' ) {
    return notFound();
  }

  const carpeta = await getCarpetabyNumero( Number( params.numero ) );

  return (
    <CarpetaFormProvider
      key={params.numero}
      carpeta={carpeta}
    >
      {children}
    </CarpetaFormProvider>
  );
}
