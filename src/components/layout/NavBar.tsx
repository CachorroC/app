import { Suspense } from 'react';
import { CarpetasList } from '../Carpetas/client/carpetasList';
import { Header } from './Header';
import { SearchOutputListSkeleton } from './search/SearchProcesosOutputSkeleton';

export async function NavBar () {
      const carpetas = await fetch(
        'https://api.rsasesorjuridico.com/api/Carpetas', {
          headers: {
            'CF-Access-Client-Id'    : 'dac874230dcfcd71de02b41f5e78083c.access',
            'CF-Access-Client-Secret': 'cd9f43a4ea535037f9a1d03fc82e2477020438e462bb076d7926c53ebbadeaf8'
          }
        }
      )
            .then(
              (
                res
              ) => {
                        return res.json();
              }
            );
      return (
        <Header>
          <Suspense fallback={<SearchOutputListSkeleton />}>
            <CarpetasList carpetas={carpetas } />
          </Suspense>
        </Header>
      );
}
