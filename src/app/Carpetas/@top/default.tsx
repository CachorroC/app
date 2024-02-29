import styles from './styles.module.css';
import { Route } from 'next';
import ActiveLink from './activelink';
import { Suspense } from 'react';
import { Loader } from '#@/components/Loader';

export default function Default () {
      const categories = [
        'Bancolombia',
        'Reintegra',
        'LiosJuridicos',
        'Terminados',
        'Insolvencia',
        'todos'
      ];

      return (
        <div className={styles.buttons}>
          {
            categories.map(
              (
                category
              ) => {
                        return (
                          <Suspense key={category} fallback={<Loader />}>
                            <ActiveLink key={ category } href={ `/Carpetas/Categorias/${ category }` as Route } category={ category } />
                          </Suspense>
                        );
              }
            )
          }
        </div>
      );
}
