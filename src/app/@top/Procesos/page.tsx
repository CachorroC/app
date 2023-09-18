import { CategoryFilterButton } from 'components/Buttons/FilteringButtons';
import typography from '#@/styles/fonts/typography.module.scss';
import { Calendar } from '#@/components/Calendar/main';
import { Suspense } from 'react';
import { Loader } from '#@/components/Loader';

export default function PageProcesos() {
  return (
    <>
      <h1 className={typography.displayLarge}>Procesos</h1>
      <CategoryFilterButton />
    </>
  );
}
