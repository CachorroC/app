
import typography from '#@/styles/fonts/typography.module.scss';
import styles from '#@/components/Buttons/buttons.module.css';
import Link from 'next/link';
import Modal from '#@/components/Modal';

export default function PageProcesos() {
  return (
    <>
      <h1 className={typography.displayLarge}>{'Notas'}</h1>
      <Link
        className={styles.button}
        href={'/Notas/Nueva'}
      >
        <p className={styles.text}>{'Nueva Nota'}</p>
        <span className={`material-symbols-outlined ${ styles.icon }`}>
          note_alt
        </span>
      </Link>

    </>
  );
}
