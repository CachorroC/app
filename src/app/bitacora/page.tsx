import { connection } from 'next/server';
import { BarraFiltros } from '#@/components/notas-tareas/barra-filtros';
import { EstadoVacio } from '#@/components/notas-tareas/estado-vacio';
import { BotonLimpiarFiltros } from '#@/components/notas-tareas/boton-limpiar-filtros';
import { BotonNuevaNota } from '#@/components/bitacora/boton-nueva-nota';
import { SelectorVista } from '#@/components/bitacora/selector-vista';
import { TarjetaNota } from '#@/components/bitacora/tarjeta-nota';
import { listarCasosParaFiltro, listarNotas } from '#@/lib/bitacora/queries';
import { FiltrosNotas } from '#@/lib/bitacora/tipos';
import { aNotaVista } from '#@/lib/bitacora/vista';
import styles from './pagina.module.css';

const ESTADOS_FILTRO = [
  {
    valor: 'PENDIENTE',
    label: 'Pendiente' 
  },
  {
    valor: 'EN_REVISION',
    label: 'En revisión' 
  },
  {
    valor: 'ATENDIDA',
    label: 'Atendida' 
  },
  {
    valor: 'ARCHIVADA',
    label: 'Archivada' 
  },
];

type SearchParams = {
  q?     : string;
  estado?: string;
  caso?  : string;
  orden? : string;
  vista? : string;
};

export default async function PaginaNotas( {
  searchParams 
}: { searchParams: Promise<SearchParams> } ) {
  await connection();
  const sp = await searchParams;

  const filtros: FiltrosNotas = {
    q     : sp.q || undefined,
    estado: sp.estado
      ? sp.estado.split( ',' )
          .filter( Boolean )
      : undefined,
    caso : sp.caso,
    orden: ( sp.orden as FiltrosNotas['orden'] ) || 'editada',
  };
  const vista = sp.vista === 'lista'
    ? 'lista'
    : 'tarjetas';

  const [
    {
      notas, fijadas 
    },
    casos 
  ] = await Promise.all( [
    listarNotas( filtros ),
    listarCasosParaFiltro(),
  ] );

  const hayFiltrosActivos = Boolean( sp.q || sp.estado || ( sp.caso && sp.caso !== 'todos' ) );
  const sinResultados = notas.length === 0 && fijadas.length === 0;
  const contenedor = vista === 'lista'
    ? styles.lista
    : styles.grid;
  const layoutTarjeta = vista === 'lista'
    ? 'lista' as const
    : 'tarjeta' as const;

  return (
    <div className={styles.pagina}>
      <div className={styles.encabezado}>
        <div>
          <h2 className={styles.titulo}>Notas</h2>
          <p className={styles.subtitulo}>Apuntes y listas de verificación del despacho</p>
        </div>
        <div className={styles.acciones}>
          <SelectorVista vista={vista} />
          <BotonNuevaNota />
        </div>
      </div>

      <BarraFiltros casos={casos} estados={ESTADOS_FILTRO} placeholder="Buscar en notas…" />

      {sinResultados
        ? (
            <EstadoVacio
              icono={hayFiltrosActivos
                ? 'search_off'
                : 'note_add'}
              titulo={hayFiltrosActivos
                ? 'Sin resultados'
                : 'Todavía no hay notas'}
              mensaje={hayFiltrosActivos
                ? 'Ninguna nota coincide con los filtros actuales.'
                : 'Crea la primera nota del despacho, con o sin caso asociado.'}
              accion={hayFiltrosActivos
                ? <BotonLimpiarFiltros />
                : <BotonNuevaNota />}
            />
          )
        : (
            <>
              {fijadas.length > 0 && (
                <section className={styles.seccion}>
                  <div className={styles.seccionTitulo}>
                    <span className="material-symbols-rounded" aria-hidden="true">push_pin</span>
                    Fijadas
                  </div>
                  <div className={contenedor}>
                    {fijadas.map( ( n ) => {
                      return <TarjetaNota key={n.id} nota={aNotaVista( n )} layout={layoutTarjeta} />;
                    } )}
                  </div>
                </section>
              )}
              <section className={styles.seccion}>
                {fijadas.length > 0 && <div className={styles.seccionTitulo}>Todas las notas</div>}
                <div className={contenedor}>
                  {notas.map( ( n ) => {
                    return <TarjetaNota key={n.id} nota={aNotaVista( n )} layout={layoutTarjeta} />;
                  } )}
                </div>
              </section>
            </>
          )}
    </div>
  );
}
