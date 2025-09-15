import { Juzgado } from '#@/lib/types/carpetas';
import styles from './styles.module.css';
import Link from 'next/link';
import { Route } from 'next';

export function JuzgadoComponent( {
  juzgado 
}: { juzgado: Juzgado } ) {
  const {
    tipo, url, id, ciudad 
  } = juzgado;

  const indexOfTipo = tipo.search( /([Ee][Jj][Ee][Cc])/gm );

  return (
    <Link
      key={url}
      target={'_blank'}
      className={
        indexOfTipo === -1
          ? styles.buttonOrigen
          : styles.buttonEjecucion
      }
      href={url as Route}
    >
      <span className={`material-symbols-outlined ${ styles.icon }`}>
        {indexOfTipo === -1
          ? 'assured_workload'
          : 'gavel'}
      </span>
      <span className={styles.text}>
        {`Juzgado ${ id } ${ tipo } de ${ ciudad }`.toLocaleLowerCase()}
      </span>
    </Link>
  );
}

export function JuzgadoErrorComponent() {
  return (
    <div className={styles.button}>
      <span className={`material-symbols-outlined ${ styles.icon }`}>
        assured_workload
      </span>
      <span className={styles.text}>No hay juzgado asignado</span>
    </div>
  );
}
