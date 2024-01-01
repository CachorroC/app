import { Suspense } from 'react';
import { Header } from './Header';
import { SearchOutputListSkeleton } from './search/SearchProcesosOutputSkeleton';
import styles from '#@/styles/layout.module.css';
import { Loader } from '../Loader';
import { CarpetasSortProvider } from '#@/app/context/carpetas-sort-context';
import getCarpetas from '#@/lib/project/utils/Carpetas/getCarpetas';
import { SearchOutputList } from './search/SearchProcesosOutput';

export async function NavBar () {
      const carpetas = await getCarpetas();
      return (
        <div className={ styles.header }>
          <Suspense fallback={<Loader />}>
            <CarpetasSortProvider initialCarpetas={carpetas}>
              <Header>
                <Suspense fallback={<SearchOutputListSkeleton />}>
                  <SearchOutputList />
                </Suspense>
              </Header>
            </CarpetasSortProvider>
          </Suspense>
        </div>
      );
}
