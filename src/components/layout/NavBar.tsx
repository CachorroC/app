import { Suspense } from 'react';
import { CarpetasList } from '../Carpetas/client/carpetasList';
import { Header } from './Header';
import { SearchOutputListSkeleton } from './search/SearchProcesosOutputSkeleton';
import getCarpetas from '#@/lib/project/utils/Carpetas/getCarpetas';
import styles from '#@/styles/layout.module.css';
import { Loader } from '../Loader';

export async function NavBar () {
      const carpetas = await getCarpetas();
      return (
        <div className={ styles.header }>
          <Suspense fallback={<Loader />}>
            <Header>
              <Suspense fallback={<SearchOutputListSkeleton />}>
                <CarpetasList carpetas={carpetas } />
              </Suspense>
            </Header>
          </Suspense>
        </div>
      );
}
