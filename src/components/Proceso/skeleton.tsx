import styles from './procesos.module.css';
import typography from '#@/styles/fonts/typography.module.css';

export function ProcesosCardSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={`${ typography.titleLarge } ${ styles.title }`}>Cargando</h1>

        <p className={`${ typography.bodyMedium } ${ styles.content }`}>
          Espere un momento por favor
        </p>
      </div>
    </div>
  );
}
