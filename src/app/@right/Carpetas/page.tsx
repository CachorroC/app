import { CategoryFilterButton } from '#@/components/Buttons/FilteringButtons';
import { CarpetasSortButtons } from '#@/components/Carpetas/client/carpetasButtonsSort';

export default function Page() {
  return (
    <>
      <CategoryFilterButton />
      <CarpetasSortButtons />
    </>
  );
}
