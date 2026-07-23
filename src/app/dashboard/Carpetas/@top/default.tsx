import { Suspense } from 'react';
import { Loader } from '#@/components/Loader/main-loader';
import { InputSearchBar } from '#@/components/layout/InputSearchBar';
import { ForwardBackwardNavButtons } from '#@/components/Buttons/nav-buttons';
import CategoryFilteringButtons from '../@right/category-filtering-buttons';
import styles from './compact-toolbar.module.css';

export default function Default() {
  return (
    <div className={styles.bar}>
      <h1 className={styles.title}>Carpetas</h1>

      <div className={styles.searchField}>
        <Suspense fallback={<Loader />}>
          <InputSearchBar />
        </Suspense>
      </div>

      <div className={styles.nav}>
        <Suspense fallback={<Loader />}>
          <ForwardBackwardNavButtons />
        </Suspense>
      </div>

      <div className={styles.categories}>
        <Suspense fallback={null}>
          <CategoryFilteringButtons />
        </Suspense>
      </div>
    </div>
  );
}
