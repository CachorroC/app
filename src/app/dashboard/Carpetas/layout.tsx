import styles from '#@/styles/layout.module.css';
import tokens from './design-tokens.module.css';
import { quicksandCarpetas, plexMonoCarpetas } from './fonts';
import 'material-symbols/rounded.css';
import { ReactNode, Suspense } from 'react';
import { NuevaCarpetaFormProvider } from '../../Context/nueva-carpeta-form-context';
import { CarpetasSortProvider } from '../../Context/carpetas-sort-context';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { Loader } from '#@/components/Loader/main-loader';
import { connection } from 'next/server';
import { FilterDrawer,
  FilterDrawerButton, } from '#@/components/layout/FilterDrawer';

const RIGHT_DRAWER_ID = 'carpetas-filters';

const scopeClassName = `${ tokens.scope } ${ quicksandCarpetas.variable } ${ plexMonoCarpetas.variable }`;

async function LayoutAsyncProcess( {
  children 
}: { children: ReactNode } ) {
  await connection();

  const carpetas = await getCarpetas();

  return (
    <CarpetasSortProvider initialCarpetas={carpetas}>
      {children}
    </CarpetasSortProvider>
  );
}

export default function LayoutProcesosMain( {
  children,
  top,
  right,
  modal,
}: {
  children: ReactNode;
  top     : ReactNode;
  right   : ReactNode;
  modal   : ReactNode;
} ) {
  return (
    <Suspense fallback={<Loader />}>
      <LayoutAsyncProcess>
        <NuevaCarpetaFormProvider>
          <Suspense fallback={<Loader />}>{modal}</Suspense>
          <Suspense fallback={<Loader />}>
            <div className={`${ styles.top } ${ scopeClassName }`}>
              {top}
              <FilterDrawerButton id={RIGHT_DRAWER_ID} />
            </div>
          </Suspense>
          <Suspense fallback={<Loader />}>
            <div className={`${ styles.leftGrid } ${ scopeClassName }`}>
              {children}
            </div>
          </Suspense>
          <Suspense fallback={<Loader />}>
            <FilterDrawer id={RIGHT_DRAWER_ID}>
              <div className={scopeClassName}>{right}</div>
            </FilterDrawer>
          </Suspense>
        </NuevaCarpetaFormProvider>
      </LayoutAsyncProcess>
    </Suspense>
  );
}
