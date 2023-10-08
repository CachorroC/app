
import styles from '#@/components/Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import type { Route } from 'next';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={styles.errorContainer}>
      <h2 className={typography.displayLarge}>No encontrado</h2>
      <p className={typography.bodyLarge}>No pudimos localizar el recurso que consultaste</p>
      <Link
        href={'/' as Route}
        className={styles.link}
      >
        <span>Inicio</span>
        <span className={`material-symbols-outlined ${ styles.icon }`}>home</span>
      </Link>
    </div>
  );
}
