

import { CarpetasSortButtons } from '#@/components/Carpetas/client/carpetasButtonsSort';
import InputSearchBar from '#@/components/layout/search/InputSearchBar';
import typography from '#@/styles/fonts/typography.module.scss';

export default function TopProcesos () {
  return (
    <>
      <h1 className={ typography.displayLarge }>Ultimas Actuaciones</h1>

      <InputSearchBar />
      <CarpetasSortButtons />

    </>
  );
}