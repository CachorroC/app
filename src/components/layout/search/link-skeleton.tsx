import searchbar from './searchbar.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import styles from 'components/Card/card.module.css';
import { section } from '#@/components/form/form.module.css';

export default function LinkCardSkeleton() {
  return (
    <div className={searchbar.container}>
      <div className={searchbar.notActive}>
        <h1 className={typography.titleMedium}>Cargando</h1>
        <div className={section}>
          <sub className={searchbar.date}>00-00-0000</sub>
        </div>
        <div className={styles.links}>
          <p className={styles.link}>
            <span className={`material-symbols-outlined ${ searchbar.icon }`}>
              badge
            </span>
          </p>
          <p className={styles.link}>
            <span className={`material-symbols-outlined ${ searchbar.icon }`}>
              add
            </span>
          </p>
          <p className={styles.link}>
            <span className={`material-symbols-outlined ${ searchbar.icon }`}>
              file_open
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
