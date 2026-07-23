import Link from 'next/link';
import type { Route } from 'next';
import { Card } from '#@/components/ds/card';
import { ChipEstado } from '#@/components/notas-tareas/chip-estado';
import { ChipEtiqueta } from '#@/components/notas-tareas/chip-etiqueta';
import { NotaVista } from '#@/lib/bitacora/vista';
import styles from './tarjeta-nota.module.css';

const CasoMarca = ( {
  carpeta, compacto 
}: { carpeta: string | null; compacto?: boolean } ) => {
  const sinCaso = !carpeta;

  return (
    <span className={`${ styles.casoMarca } ${ sinCaso
      ? styles.sinCaso
      : '' }`}
    >
      <span className="material-symbols-rounded" aria-hidden="true">{sinCaso
        ? 'folder_off'
        : 'folder'}</span>
      <span className={`${ styles.casoTexto } ${ compacto
        ? styles.compacto
        : '' }`}
      >
        {sinCaso
          ? 'Sin caso'
          : carpeta}
      </span>
    </span>
  );
};

const Etiquetas = ( {
  etiquetas 
}: { etiquetas: NotaVista['etiquetas'] } ) => {
  if ( etiquetas.length === 0 ) {
    return null;
  }

  const visibles = etiquetas.slice(
    0, 3 
  );
  const extra = etiquetas.length - visibles.length;

  return (
    <div className={styles.etiquetas}>
      {visibles.map( (
        e, i 
      ) => {
        return <ChipEtiqueta key={i} texto={e.texto} color={e.color} />;
      } )}
      {extra > 0 && <span className={styles.masEtiquetas}>{`+${ extra }`}</span>}
    </div>
  );
};

export type TarjetaNotaProps = {
  nota   : NotaVista;
  layout?: 'tarjeta' | 'lista';
};

// Server-renderable: la navegación se hace con Link (href), no con onClick,
// para que esta tarjeta pueda montarse desde un Server Component sin
// necesitar un límite "use client" propio.
export const TarjetaNota = ( {
  nota, layout = 'tarjeta' 
}: TarjetaNotaProps ) => {
  const href: Route<`/dashboard/bitacora/${string}`> = `/dashboard/bitacora/${ nota.id }`;

  if ( layout === 'lista' ) {
    return (
      <Link href={href} className={styles.enlace}>
        <Card variant="outlined" interactive padding={0}>
          <div className={styles.filaLista}>
            {nota.fijada && (
              <span className={styles.pin}>
                <span className="material-symbols-rounded" aria-hidden="true">push_pin</span>
              </span>
            )}
            <div className={styles.filaListaCuerpo}>
              <div className={styles.filaListaTitulo}>{nota.titulo}</div>
              <div className={styles.filaListaMeta}>
                <CasoMarca carpeta={nota.carpeta} compacto />
                <span className={styles.editadaTexto}>{`Editada ${ nota.editada }`}</span>
              </div>
            </div>
            <div className={styles.filaListaExtras}>
              <div className={styles.ocultarCompacto}><Etiquetas etiquetas={nota.etiquetas} /></div>
              <ChipEstado variante={nota.estado} />
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={href} className={styles.enlace}>
      <Card variant="outlined" interactive padding={18} style={{
        display      : 'flex',
        flexDirection: 'column',
        gap          : 12,
        height       : '100%' 
      }}
      >
        <div className={styles.encabezadoGrid}>
          {nota.fijada && (
            <span className={styles.pinGrid}>
              <span className="material-symbols-rounded" aria-hidden="true">push_pin</span>
            </span>
          )}
          <h4 className={styles.tituloGrid}>{nota.titulo}</h4>
          <ChipEstado variante={nota.estado} conIcono={false} />
        </div>
        <CasoMarca carpeta={nota.carpeta} />
        <p className={styles.preview}>{nota.preview}</p>
        <Etiquetas etiquetas={nota.etiquetas} />
        <div className={styles.piePagina}>
          <span className={styles.piePaginaDato}>
            <span className="material-symbols-rounded" aria-hidden="true">event</span>{nota.creada}
          </span>
          <div className={styles.espaciador} />
          <span className={styles.piePaginaDato}>
            <span className="material-symbols-rounded" aria-hidden="true">edit</span>{nota.editada}
          </span>
        </div>
      </Card>
    </Link>
  );
};
