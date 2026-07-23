import CarpetasDashboard from '#@/components/dashboard/CarpetasDashboard';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { Carpeta, Category, TipoProceso } from '#@/lib/types/dashboard_types';

export default async function CarpetasPage() {
  const carpetas = await getCarpetas();

  const newCarpetas: Carpeta[] = carpetas.map( ( c ) => {
    console.log( c.fecha );

    return {
      actuaciones: c.ultimaActuacion
        ? [
            {
              id           : Number( c.ultimaActuacion.idRegActuacion ),
              fecha        : c.ultimaActuacion.fechaActuacion.toISOString(),
              actuacion    : c.ultimaActuacion.actuacion,
              anotacion    : c.ultimaActuacion.anotacion ?? 'sin anotacion',
              conDocumentos: c.ultimaActuacion.conDocumentos,
              isUltima     : true,
            },
          ]
        : [],
      avaluo  : c.demanda.avaluo ?? 0,
      capital : c.demanda.capitalAdeudado ?? 0,
      category: c.category as Category,
      ciudad  : c.ciudad ?? '',
      codeudor: c.codeudor
        ? {
            id       : c.codeudor.id,
            nombre   : c.codeudor.nombre ?? '',
            cedula   : c.codeudor.cedula,
            direccion: c.codeudor.direccion,
          }
        : null,
      demanda: {
        id             : c.demanda.id,
        departamento   : c.demanda.departamento ?? '',
        municipio      : c.demanda.municipio ?? '',
        despacho       : c.demanda.despacho ?? '',
        etapaProcesal  : c.demanda.etapaProcesal ?? '',
        tipoProceso    : c.demanda.tipoProceso,
        radicado       : c.demanda.radicado ?? '',
        capitalAdeudado: c.demanda.capitalAdeudado ?? 0,
        avaluo         : c.demanda.avaluo ?? 0,
        liquidacion    : c.demanda.liquidacion ?? 0,
        obligacion     : c.demanda.obligacion,
        fechaPresentacion:
          c.demanda.fechaPresentacion[ 0 ]?.toISOString() ?? null,
        vencimientoPagare:
          c.demanda.vencimientoPagare[ 0 ]?.toISOString() ?? null,
        mandamientoPago: c.demanda.mandamientoPago[ 0 ]?.toISOString() ?? null,
        entregaGarantias:
          c.demanda.entregaGarantiasAbogado?.toISOString() ?? null,
      },
      deudor  : c.deudor!,
      etapa   : c.demanda.etapaProcesal ?? '',
      facturas: [],
      fecha:
        typeof c.fecha === 'string'
          ? c.fecha
          : c.fecha === null
            ? ''
            : c.fecha.toISOString(),
      juzgado: {
        id    : c.juzgado!.id,
        nombre: c.juzgado!.id,
        tipo  : c.juzgado!.tipo,
        ciudad: c.juzgado!.ciudad,
        url   : c.juzgado!.url ?? null,
      },
      liquidacion : c.demanda.liquidacion ?? 0,
      llaveProceso: c.llaveProceso,
      nombre      : c.nombre,
      notas       : c.notas.map( ( n ) => {
        return {
          id       : n.id,
          text     : n.text,
          content  : n.content,
          createdAt: n.createdAt.toISOString(),
          dueDate  : n.dueDate?.toISOString() ?? null,
          completed: n.completed,
        };
      } ),
      numero  : c.numero,
      procesos: c.procesos.map( ( p ) => {
        return {
          idProceso           : p.idProceso,
          despacho            : p.despacho,
          departamento        : p.departamento,
          juzgado             : p.juzgado.id,
          fechaProceso        : p.fechaProceso?.toISOString() ?? null,
          fechaUltimaActuacion: p.fechaUltimaActuacion?.toISOString() ?? null,
          cantFilas           : p.cantFilas,
          esPrivado           : p.esPrivado,
          sujetosProcesales   : p.sujetosProcesales,
        };
      } ),
      radicado: c.demanda.radicado ?? '',
      revisado: c.revisado,
      status  : c.category === 'Terminados'
        ? 'done'
        : 'active',
      terminado  : c.terminado,
      tipoProceso: c.tipoProceso as TipoProceso,
      vencido    : c.category === 'Terminados',
    };
  } );

  return <CarpetasDashboard initialCarpetas={newCarpetas} />;
}
