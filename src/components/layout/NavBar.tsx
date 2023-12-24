import { Suspense } from 'react';
import { CarpetasList } from '../Carpetas/client/carpetasList';
import { Header } from './Header';
import { SearchOutputListSkeleton } from './search/SearchProcesosOutputSkeleton';
import styles from '#@/styles/layout.module.css';
import { Loader } from '../Loader';

export function NavBar () {
      return (
        <div className={ styles.header }>
          <Suspense fallback={<Loader />}>
            <Header>
              <Suspense fallback={<SearchOutputListSkeleton />}>
                <CarpetasList/>
              </Suspense>
            </Header>
          </Suspense>
        </div>
      );
}
