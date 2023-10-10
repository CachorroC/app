import styles from '#@/components/Buttons/buttons.module.css';
import InputSearchBar from '#@/components/layout/search/InputSearchBar';
import typography from '#@/styles/fonts/typography.module.scss';
import type { Route } from 'next';
import Link from 'next/link';

export default function TopProcesos() {
  return (
    <>
      <h1 className={typography.displayLarge}>Carpetas</h1>
      <Link
        className={styles.button}
        href={'/Carpetas/Nueva' as Route}
      >
        <span className={styles.text}>Nueva Carpeta</span>
        <span className={`material-symbols-outlined ${ styles.icon }`}>add</span>
      </Link>
      <InputSearchBar />
    </>
  );
}
