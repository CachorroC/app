import { connection } from 'next/server';
import { BarraFiltros } from '#@/components/notas-tareas/barra-filtros';
import { EstadoVacio } from '#@/components/notas-tareas/estado-vacio';
import { BotonLimpiarFiltros } from '#@/components/notas-tareas/boton-limpiar-filtros';
import { BotonNuevaTarea } from '#@/components/tareas/boton-nueva-tarea';
import { GrupoTareas } from '#@/components/tareas/grupo-tareas';
import { listarCasosParaFiltroTareas, listarTareas } from '#@/lib/tareas/queries';
import { FiltrosTareas } from '#@/lib/tareas/tipos';
import { aTareaVista } from '#@/lib/tareas/vista';
import styles from './pagina.module.css';

const ESTADOS_FILTRO = [
  {
    valor: 'PENDIENTE',
    label: 'Pendiente' 
  },
  {
    valor: 'EN_PROGRESO',
    label: 'En progreso' 
  },
  {
    valor: 'ATENDIDA',
    label: 'Atendida' 
  },
  {
    valor: 'VENCIDA',
    label: 'Vencida' 
  },
  {
    valor: 'ARCHIVADA',
    label: 'Archivada' 
  },
];

type SearchParams = {
  q?      : string;
  estado? : string;
  caso?   : string;
  termino?: string;
  desde?  : string;
  hasta?  : string;
};

export default async function PaginaTareas( {
  searchParams 
}: { searchParams: Promise<SearchParams> } ) {
  await connection();
  const sp = await searchParams;

  const filtros: FiltrosTareas = {
    q     : sp.q || undefined,
    estado: sp.estado
      ? sp.estado.split( ',' )
          .filter( Boolean )
      : undefined,
    caso   : sp.caso,
    termino: sp.termino === '1',
    desde  : sp.desde,
    hasta  : sp.hasta,
  };

  const [
    grupos,
    casos 
  ] = await Promise.all( [
    listarTareas( filtros ),
    listarCasosParaFiltroTareas(),
  ] );

  const hayFiltrosActivos = Boolean( sp.q || sp.estado || ( sp.caso && sp.caso !== 'todos' ) || sp.termino || sp.desde || sp.hasta, );
  const sinResultados = grupos.length === 0;

  return (
    <div className={styles.pagina}>
      <div className={styles.encabezado}>
        <div>
          <h2 className={styles.titulo}>Tareas</h2>
          <p className={styles.subtitulo}>Pendientes internos y términos procesales por vencimiento</p>
        </div>
        <BotonNuevaTarea />
      </div>

      <BarraFiltros casos={casos} estados={ESTADOS_FILTRO} placeholder="Buscar en tareas…" />

      {sinResultados
        ? (
            <EstadoVacio
              icono={hayFiltrosActivos
                ? 'search_off'
                : 'playlist_add_check'}
              titulo={hayFiltrosActivos
                ? 'Sin resultados'
                : 'Todavía no hay tareas'}
              mensaje={hayFiltrosActivos
                ? 'Ninguna tarea coincide con los filtros actuales.'
                : 'Crea la primera tarea, con o sin caso asociado, o promueve un ítem de checklist desde una nota.'}
              accion={hayFiltrosActivos
                ? <BotonLimpiarFiltros />
                : <BotonNuevaTarea />}
            />
          )
        : (
            <div className={styles.grupos}>
              {grupos.map( ( g ) => {
                return (
                  <GrupoTareas
                    key={g.grupo}
                    grupo={g.grupo}
                    tareas={g.tareas.map( aTareaVista )}
                  />
                );
              } )}
            </div>
          )}
    </div>
  );
}
