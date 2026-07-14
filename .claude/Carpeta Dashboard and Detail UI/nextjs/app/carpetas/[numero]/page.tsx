import { notFound } from 'next/navigation';
import CarpetaDetail from '@/components/detail/CarpetaDetail';
import { getCarpeta, CARPETAS } from '@/lib/mockData';

// Pre-render every carpeta route at build time (optional).
export function generateStaticParams() {
  return CARPETAS.map( ( c ) => {
    return {
      numero: String( c.numero ),
    };
  } );
}

// In a real app, load the carpeta + all relations here:
//   const carpeta = await prisma.carpeta.findUnique({ where: { numero }, include: { ... } });
export default async function CarpetaDetailPage( {
  params,
}: {
  params: Promise<{ numero: string }>;
} ) {
  const {
    numero 
  } = await params;
  const carpeta = getCarpeta( Number( numero ) );

  if ( !carpeta ) {
    notFound();
  }

  return <CarpetaDetail carpeta={carpeta} />;
}
