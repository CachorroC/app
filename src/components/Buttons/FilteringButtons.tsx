'use client';
import styles from 'components/Buttons/buttons.module.css';
import { useCategory } from '#@/app/context/main-context';

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
    category, setCategory
  } = useCategory();

  return (
    <button
      onClick={() => {
        setCategory(
          categoria
        );
      }}
      type="button"
      className={
        category === categoria
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
    <section className={styles.segmentColumn}>
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
