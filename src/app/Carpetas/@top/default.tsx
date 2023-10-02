

import { CarpetasSortButtons } from '#@/components/Carpetas/client/carpetasButtonsSort';
import InputSearchBar from '#@/components/layout/search/InputSearchBar';
import typography from '#@/styles/fonts/typography.module.scss';
import styles from '#@/styles/layout.module.css';

export default function TopProcesos () {
  return (
    <>
      <h1 className={ typography.displayLarge }>Ultimas Actuaciones</h1>
      <div className={ styles.section }>
        <InputSearchBar />
        <CarpetasSortButtons />
      </div>
    </>
  );
}