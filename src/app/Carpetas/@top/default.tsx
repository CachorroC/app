import { Suspense } from 'react';
import { Loader } from '#@/components/Loader/main-loader';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { InputSearchBar } from '#@/components/layout/InputSearchBar';
import { ForwardBackwardNavButtons } from '#@/components/Buttons/nav-buttons';
import CategoryFilteringButtons from '../@right/category-filtering-buttons';

export default async function Default() {
  const carpetas = await getCarpetas();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <InputSearchBar carpetas={carpetas} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <ForwardBackwardNavButtons />
      </Suspense>
      <Suspense fallback={null}>
        <CategoryFilteringButtons row={true} />
      </Suspense>
    </>
  );
}
