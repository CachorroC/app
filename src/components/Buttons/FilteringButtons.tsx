'use client';
import styles from 'components/Buttons/buttons.module.css';
import layout from '#@/styles/layout.module.css';
import { usePathname } from 'next/navigation';
import { useCategory } from '#@/app/Context/category-context';

export const CategoryButton = (
  {
    categoria,
    icon,
  }: {
    categoria: string;
    icon: string;
  }
) => {
          const {
            currentCategory, setCurrentCategory
          } = useCategory();

          const pathname = usePathname();

          const isActive
    = pathname === `/Carpetas/${ categoria }` || categoria === currentCategory;

          return (
            <button
              onClick={() => {
                        return setCurrentCategory(
                          categoria
                        );
              }}
              className={
                isActive
                  ? styles.buttonActiveCategory
                  : styles.buttonPassiveCategory
              }
            >
              <span className={`material-symbols-outlined ${ styles.icon }`}>{icon}</span>
              <p className={styles.text}>{categoria}</p>
            </button>
          );
};

export const CategoryFilterButton = () => {
          const categorias = [
            'Reintegra',
            'Bancolombia',
            'LiosJuridicos',
            'Insolvencia',
            'Terminados',
            'todos',
          ];

          const icons = [
            'integration_instructions',
            'account_balance_wallet',
            'gavel',
            'money_off',
            'group_remove',
            'clear_all',
          ];

          return (
            <section className={layout.sectionColumn}>
              {categorias.map(
                (
                  category, index
                ) => {
                          return (
                            <CategoryButton
                              key={category}
                              categoria={category}
                              icon={icons[ index ]}
                            />
                          );
                }
              )}
            </section>
          );
};
