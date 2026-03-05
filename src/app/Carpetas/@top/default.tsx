import { Suspense } from 'react';
import { Loader } from '#@/components/Loader/main-loader';
import { InputSearchBar } from '#@/components/layout/InputSearchBar';
import { ForwardBackwardNavButtons } from '#@/components/Buttons/nav-buttons';
import CategoryFilteringButtons from '../@right/category-filtering-buttons';

export default function Default() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <InputSearchBar />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <ForwardBackwardNavButtons />
      </Suspense>
      <Suspense fallback={null}>
        <CategoryFilteringButtons />
      </Suspense>
    </>
  );
}
