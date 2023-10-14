import styles from '#@/components/Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={styles.errorContainer}>
      <h2 className={typography.displayMedium}>No encontrado</h2>
      <p className={typography.bodyMedium}>
        No pudimos localizar el recurso que consultaste
      </p>
      <Link
        href={'/'}
        className={styles.link}
      >
        <span className={ `material-symbols-outlined ${ styles.icon }` }>home</span>
      </Link>
    </div>
  );
}
