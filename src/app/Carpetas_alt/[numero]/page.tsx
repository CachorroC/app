import { notFound } from 'next/navigation';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import CarpetaDetail from '#@/components/detail/CarpetaDetail';
import { Carpeta } from '#@/lib/types/dashboard_types';
import { getActuacionesByCarpetaNumero } from '#@/lib/project/utils/Actuaciones';

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
  const carpeta = await getCarpetabyNumero( Number( numero ) );

  if ( !carpeta ) {
    notFound();
  }

  const actuaciones = await getActuacionesByCarpetaNumero( Number( numero ) );

  const mappedCarpeta: Carpeta = {
    ...carpeta,
    actuaciones: actuaciones.map( ( a ) => {
      return {
        ...a,
        fecha    : a.fechaActuacion.toISOString(),
        id       : Number( a.idRegActuacion ),
        anotacion: a.anotacion ?? '',
      };
    } ),
    avaluo     : carpeta.demanda.avaluo ?? 0,
    capital    : carpeta.demanda.capitalAdeudado ?? 0,
    etapa      : carpeta.demanda.etapaProcesal ?? '',
    facturas   : [],
    liquidacion: 0,
    radicado   : carpeta.demanda.radicado ?? '',
    status     : carpeta.terminado
      ? 'done'
      : 'active',
    vencido: carpeta.terminado
  };

  return <CarpetaDetail carpeta={mappedCarpeta} />;
}
