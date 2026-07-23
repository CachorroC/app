import { CarpetasSortButtons } from '#@/app/Carpetas/@right/carpetasButtonsSort';
import { ResetButtonSorter } from './reset-button';
import CategoryFilteringButtons from './category-filtering-buttons';
import TipoProcesoFilteringButtons from './tipo-proceso-filter';
import CiudadFilteringButtons from './ciudad-filter';
import EstadoFilteringButtons from './estado-filter';
import { InputSearchBar } from '#@/components/layout/InputSearchBar';
import styles from './toolbar.module.css';

export default function Default() {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchRow}>
        <div className={styles.searchField}>
          <InputSearchBar />
        </div>
        <CarpetasSortButtons />
      </div>

      <div className={styles.facets}>
        <CategoryFilteringButtons />
        <TipoProcesoFilteringButtons />
        <CiudadFilteringButtons />
        <EstadoFilteringButtons />
      </div>

      <ResetButtonSorter />
    </div>
  );
}
