import { notFound } from 'next/navigation';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import CarpetaDetail from '#@/components/detail/CarpetaDetail';
import { Carpeta, Category, TipoProceso } from '#@/lib/types/dashboard_types';
import { getActuacionesByCarpetaNumero } from '#@/lib/project/utils/Actuaciones';

export const dynamic = 'force-dynamic';

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
    actuaciones: actuaciones.map( ( a ) => {
      return  {
        id           : Number( a.idRegActuacion ),
        fecha        : a.fechaActuacion.toISOString(),
        actuacion    : a.actuacion,
        anotacion    : a.anotacion ?? '',
        conDocumentos: a.conDocumentos,
        isUltima     : a.isUltimaAct,
      };
    } ),
    avaluo  : carpeta.demanda.avaluo ?? 0,
    capital : carpeta.demanda.capitalAdeudado ?? 0,
    category: carpeta.category as Category,
    ciudad  : carpeta.ciudad ?? '',
    codeudor: carpeta.codeudor
      ? {
          id       : carpeta.codeudor.id,
          nombre   : carpeta.codeudor.nombre ?? '',
          cedula   : carpeta.codeudor.cedula,
          telefono : carpeta.codeudor.telefono,
          direccion: carpeta.codeudor.direccion,
        }
      : null,
    demanda: {
      id               : carpeta.demanda.id,
      departamento     : carpeta.demanda.departamento ?? '',
      municipio        : carpeta.demanda.municipio ?? '',
      despacho         : carpeta.demanda.despacho ?? '',
      etapaProcesal    : carpeta.demanda.etapaProcesal ?? '',
      tipoProceso      : carpeta.demanda.tipoProceso,
      radicado         : carpeta.demanda.radicado ?? '',
      capitalAdeudado  : carpeta.demanda.capitalAdeudado ?? 0,
      avaluo           : carpeta.demanda.avaluo ?? 0,
      liquidacion      : carpeta.demanda.liquidacion ?? 0,
      obligacion       : carpeta.demanda.obligacion,
      fechaPresentacion: carpeta.demanda.fechaPresentacion[ 0 ]?.toISOString() ?? null,
      vencimientoPagare: carpeta.demanda.vencimientoPagare[ 0 ]?.toISOString() ?? null,
      mandamientoPago  : carpeta.demanda.mandamientoPago[ 0 ]?.toISOString() ?? null,
      entregaGarantias : carpeta.demanda.entregaGarantiasAbogado?.toISOString() ?? null,
      medidas          : {
        medidaSolicitada: carpeta.demanda.medidasCautelares?.medidaSolicitada ?? '',
        fechaOrdena     : carpeta.demanda.medidasCautelares?.fechaOrdenaMedida?.toISOString() ?? null,
      },
      notif: {
        certimail     : carpeta.demanda.notificacion?.certimail ?? false,
        fisico        : carpeta.demanda.notificacion?.fisico ?? false,
        autoNotificado: carpeta.demanda.notificacion?.autoNotificado?.toISOString() ?? null,
      },
    },
    deudor: {
      id             : carpeta.deudor?.id ?? 0,
      primerNombre   : carpeta.deudor?.primerNombre ?? '',
      segundoNombre  : carpeta.deudor?.segundoNombre,
      primerApellido : carpeta.deudor?.primerApellido ?? '',
      segundoApellido: carpeta.deudor?.segundoApellido,
      cedula         : carpeta.deudor?.cedula ?? '',
      direccion      : carpeta.deudor?.direccion,
      email          : carpeta.deudor?.email,
      telCelular     : carpeta.deudor?.telCelular,
      telFijo        : carpeta.deudor?.telFijo,
    },
    etapa   : carpeta.demanda.etapaProcesal ?? '',
    facturas: [],
    fecha   : carpeta.fecha?.toISOString() ?? '',
    juzgado: {
      id    : carpeta.juzgado?.id ?? '',
      nombre: carpeta.juzgado
        ? `JUZGADO ${ carpeta.juzgado.id } ${ carpeta.juzgado.tipo } DE ${ carpeta.juzgado.ciudad }`
        : '',
      tipo  : carpeta.juzgado?.tipo ?? '',
      ciudad: carpeta.juzgado?.ciudad ?? '',
      url   : carpeta.juzgado?.url,
    },
    liquidacion : 0,
    llaveProceso: carpeta.llaveProceso,
    nombre      : carpeta.nombre,
    notas       : carpeta.notas.map( ( n ) => {
      return  {
        id       : n.id,
        text     : n.text,
        content  : n.content,
        createdAt: n.createdAt.toISOString(),
        dueDate  : n.dueDate?.toISOString() ?? null,
        completed: n.completed,
      };
    } ),
    numero  : carpeta.numero,
    procesos: carpeta.procesos.map( ( p ) => {
      return  {
        idProceso   : p.idProceso,
        despacho    : p.despacho,
        departamento: p.departamento,
        juzgado     : p.juzgado
          ? `JUZGADO ${ p.juzgado.id } ${ p.juzgado.tipo } DE ${ p.juzgado.ciudad }`
          : '',
        fechaProceso        : p.fechaProceso?.toISOString() ?? null,
        fechaUltimaActuacion: p.fechaUltimaActuacion?.toISOString() ?? null,
        cantFilas           : p.cantFilas,
        esPrivado           : p.esPrivado,
        sujetosProcesales   : p.sujetosProcesales,
      };
    } ),
    radicado: carpeta.demanda.radicado ?? '',
    revisado: carpeta.revisado,
    status  : carpeta.terminado
      ? 'done'
      : 'active',
    tareas: carpeta.tareas.map( ( t ) => {
      return  {
        id     : t.id,
        text   : t.text,
        dueDate: t.dueDate.toISOString(),
        done   : t.done,
      };
    } ),
    terminado  : carpeta.terminado,
    tipoProceso: carpeta.tipoProceso as TipoProceso,
    vencido    : carpeta.terminado,
  };

  return <CarpetaDetail carpeta={mappedCarpeta} />;
}
