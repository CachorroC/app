import searchbar from 'components/layout/search/searchbar.module.css';
import styles from 'components/Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';

export function LinkCardSkeleton() {
      return (
        <div className={searchbar.notActive}>
          <h1 className={typography.titleMedium}>Cargando</h1>
          <div className={layout.segmentRow}>
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
      );
}
