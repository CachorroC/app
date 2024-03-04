import styles from './styles.module.css';
import { Route } from 'next';
import ActiveLink from './activelink';
import { Suspense } from 'react';
import { Loader } from '#@/components/Loader';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { InputSearchBar } from '#@/components/layout/InputSearchBar';
import { ForwardBackwardNavButtons } from '#@/components/Buttons/nav-buttons';

export default async function Default () {

      const carpetas = await getCarpetas();

      const categories = [
        'Bancolombia',
        'Reintegra',
        'LiosJuridicos',
        'Terminados',
        'Insolvencia',
        'todos'
      ];

      return (
        <>
          <Suspense fallback={ <Loader /> }>
            <InputSearchBar carpetas={ carpetas } />
          </Suspense>
          <Suspense fallback={ <Loader /> }>
            <ForwardBackwardNavButtons />
          </Suspense>
          <div className={ styles.buttons }>
            { categories.map(
              (
                category
              ) => {
                        return (
                          <Suspense key={ category } fallback={ <Loader /> }>
                            <ActiveLink key={ category } href={ `/Carpetas/Categorias/${ category }` as Route } category={ category } />
                          </Suspense>
                        );
              }
            ) }
          </div></>
      );
}
