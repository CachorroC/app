'use client';
import { useCarpetaSortDispatch } from '#@/app/Context/carpetas-sort-context';
import styles from '../@right/styles.module.css';

export function ResetButtonSorter() {
  const dispatchCarpetas = useCarpetaSortDispatch();
  return (
    <section className={styles.segmentedButtons}>
      <button
        type="button"
        className={styles.buttonCategoryPasive}
        onClick={() => {
          return dispatchCarpetas(
            {
              type: 'reset',
            } 
          );
        }}
      >
        <span className="material-symbols-outlined">device_reset</span>
      </button>
    </section>
  );
}
