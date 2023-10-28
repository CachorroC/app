import styles from '#@/components/Buttons/buttons.module.css';
import { NotasSortButtons } from '#@/components/Nota/client/nota-sort-buttons';
import { Route } from 'next';
import Link from 'next/link';
import typography from '#@/styles/fonts/typography.module.css';

export default function Page () {
  return (
    <>

      <h1 className={typography.displayLarge}>{'Notas'}</h1>
      <NotasSortButtons />
      <Link
        className={styles.button}
        href={'/Notas/Nueva' as Route}
      >
        <p className={styles.text}>{'Nueva Nota'}</p>
        <span className={`material-symbols-outlined ${ styles.icon }`}>note_alt</span>
      </Link></>
  );
}