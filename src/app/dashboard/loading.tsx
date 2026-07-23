import { Loader } from '#@/components/Loader/main-loader';
import layout from '#@/styles/layout.module.css';
import styles from './page.module.css';

export default function Loading() {
  return (
    <div className={layout.leftGrid}>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.brandText}>
            <p className={styles.brandTitle}>{'R&S Asesoría Jurídica'}</p>
            <p className={styles.brandSubtitle}>{'Panel principal'}</p>
          </div>
        </header>

        <div className={styles.statsGrid}>
          {Array.from( {
            length: 4,
          } )
            .map( (
              _, i 
            ) => {
              return (
                <div
                  key={i}
                  className={styles.statCard}
                >
                  <Loader />
                </div>
              );
            } )}
        </div>

        <div className={styles.navCards}>
          {Array.from( {
            length: 2,
          } )
            .map( (
              _, i 
            ) => {
              return (
                <div
                  key={i}
                  className={`${ styles.navCard } ${ styles.navCardPrimary }`}
                >
                  <Loader />
                </div>
              );
            } )}
        </div>

        <div className={styles.activityList}>
          {Array.from( {
            length: 4,
          } )
            .map( (
              _, i 
            ) => {
              return (
                <div
                  key={i}
                  className={styles.activityRow}
                >
                  <Loader />
                </div>
              );
            } )}
        </div>
      </div>
    </div>
  );
}
