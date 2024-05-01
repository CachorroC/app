import { Juzgado } from '#@/lib/types/carpetas';
import styles from './styles.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import Link from 'next/link';
import { Route } from 'next';

export function JuzgadoComponent(
  {
    juzgado
  }: { juzgado: Juzgado }
) {
      const {
        tipo, url, id, ciudad
      } = juzgado;

      const indexOfTipo = tipo.search(
        /([Ee][Jj][Ee][Cc])/gm
      );
      return (
        <div className={styles.container}>
          <h2 className={typography.titleSmall}>{`${
            indexOfTipo === -1
              ? 'Juzgado de Origen'
              : 'Juzgado de Ejecucion'
          }`}</h2>
          <Link
            key={url}
            target={'_blank'}
            className={
              indexOfTipo === -1
                ? styles.buttonInnactive
                : styles.buttonActive
            }
            href={url as Route}
          >
            <span className={`material-symbols-outlined ${ styles.icon }`}>
              {indexOfTipo === -1
                ? 'assured_workload'
                : 'gavel'}
            </span>
            <span className={styles.text}>{`Juzgado ${ id } ${ tipo } de ${ ciudad }`}</span>
          </Link>
        </div>
      );
}
