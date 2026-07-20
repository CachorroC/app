import { ReactNode } from 'react';
import styles from './estado-vacio.module.css';

export type EstadoVacioProps = {
  icono  : string;
  titulo : string;
  mensaje: string;
  // Elemento de acción ya construido (p. ej. un botón cliente con su propio
  // manejador) en vez de accionLabel/onAccion — así este componente sigue
  // siendo montable desde un Server Component: no cruza funciones por la
  // frontera server/client.
  accion?: ReactNode;
  tono?  : 'neutral' | 'error';
};

export const EstadoVacio = ( {
  icono, titulo, mensaje, accion, tono = 'neutral',
}: EstadoVacioProps ) => {
  const esError = tono === 'error';

  return (
    <div className={styles.root}>
      <span className={`${ styles.halo } ${ esError
        ? styles.error
        : styles.neutral }`}
      >
        <span className={`material-symbols-rounded ${ styles.icono }`} aria-hidden="true">{icono}</span>
      </span>
      <div>
        <div className={styles.titulo}>{titulo}</div>
        <p className={styles.mensaje}>{mensaje}</p>
      </div>
      {accion}
    </div>
  );
};
