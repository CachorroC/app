import CarpetasDashboard from '#@/components/dashboard/CarpetasDashboard';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { Carpeta, Category } from '#@/lib/types/dashboard_types';

// Server component: in a real app, fetch carpetas (with relations) here:
//   const carpetas = await prisma.carpeta.findMany({ include: { deudor: true, demanda: true, actuaciones: true, procesos: true, facturas: true, notas: true, tareas: true } });
export default async function CarpetasPage () {
  const carpetas = await getCarpetas();

  const newCarpetas: Carpeta[] = carpetas.map( ( c ) => {
    return {
      ...c,
      avaluo     : c.demanda.avaluo ?? 0,
      capital    : c.demanda.capitalAdeudado ?? 0,
      category   : c.category as Category,
      etapa      : c.demanda.etapaProcesal,
      facturas   : [],
      liquidacion: c.demanda.liquidacion,
      radicado   : c.demanda.radicado,
      status     : c.category === 'Terminados'
        ? 'Terminado'
        : 'En Proceso',
      vencido: c.category === 'Terminados'
        ? true
        : false,
      actuaciones: c.actuaciones.map( ( act ) => {
        return {
          ...act,
          id       : Number( act.idRegActuacion ),
          fecha    : act.fechaActuacion.toISOString(),
          anotacion: act.anotacion
            ? act.anotacion
            : 'sin anotacion'
        };
      } )
    };
  } );

  return <CarpetasDashboard initialCarpetas={newCarpetas} />;
}
