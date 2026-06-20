import { notFound } from 'next/navigation';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import CarpetaDetail from '#@/components/detail/CarpetaDetail';

// Pre-render every carpeta route at build time (optional).
export async function generateStaticParams () {
  const carpetas= await getCarpetas();

  return carpetas.map( ( c ) => {
    return {
      numero: String( c.numero )
    };
  } );
}

// In a real app, load the carpeta + all relations here:
//   const carpeta = await prisma.carpeta.findUnique({ where: { numero }, include: { ... } });
export default async function CarpetaDetailPage( {
  params
}: { params: Promise<{ numero: string }> } ) {
  const {
    numero
  } = await params;
  const carpeta = getCarpetabyNumero( Number( numero ) );

  if ( !carpeta ) {
    notFound();
  }

  return <CarpetaDetail carpeta={carpeta} />;
}
