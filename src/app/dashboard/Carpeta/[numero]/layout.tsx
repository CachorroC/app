import { CarpetaFormProvider } from '#@/app/Context/carpeta-form-context';
import { Loader } from '#@/components/Loader/main-loader';
import { NombreComponent } from '#@/components/nombre';
import styles from '#@/styles/layout.module.css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { ForwardBackwardNavButtons } from '#@/components/Buttons/nav-buttons';
import { getCarpetasNumeros } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { FilterDrawer,
  FilterDrawerButton, } from '#@/components/layout/FilterDrawer';

const RIGHT_DRAWER_ID = 'carpeta-detail-panel';

export async function generateStaticParams() {
  const carpetas = await getCarpetasNumeros();

  const flattenUp = carpetas
    .flatMap( ( carpeta ) => {
      const {
        numero, procesos 
      } = carpeta;

      if ( procesos.length === 0 ) {
        return {
          numero   : String( numero ),
          idProceso: 'idProceso',
        };
      }

      return procesos.map( ( proceso ) => {
        if ( proceso.esPrivado ) {
          return {
            numero   : String( numero ),
            idProceso: 'idProceso',
          };
        }

        return {
          numero   : String( numero ),
          idProceso: String( proceso.idProceso ),
        };
      } );
    } )
    .sort( (
      a, b 
    ) => {
      return Number( a.numero ) - Number( b.numero );
    } );

  const chunkSize = 100;

  const chunks = [];

  for ( let i = 0; i < flattenUp.length; i += chunkSize ) {
    const chunk = flattenUp.slice(
      i, i + chunkSize 
    );

    chunks.push( chunk );
  }

  return chunks[ chunks.length - 1 ];
}

export async function generateMetadata( {
  params,
}: {
  params: Promise<{ numero: string }>;
} ): Promise<Metadata> {
  const {
    numero 
  } = await params;

  const product = await getCarpetabyNumero( Number( numero ) );

  if ( !product ) {
    return {
      title: 'sin carpeta',
    };
  }

  return {
    title      : product.nombre,
    description: `Carpeta de ${ product.nombre } - ${ product.tipoProceso }`,

    keywords: [
      product.nombre,
      product.tipoProceso,
      product.numero.toString(),
      product.tipoProceso,
      product.category,
    ],
  };
}

export default async function LayoutCarpetaMain( {
  children,
  top,
  right,
  params,
}: {
  children: ReactNode;
  top     : ReactNode;
  right   : ReactNode;
  params  : Promise<{ numero: string }>;
} ) {
  const {
    numero 
  } = await params;

  const carpeta = await getCarpetabyNumero( Number( numero ) );

  if ( !carpeta ) {
    return notFound();
  }

  return (
    <CarpetaFormProvider
      key={numero}
      carpeta={carpeta}
    >
      <div className={styles.top}>
        <Suspense fallback={<Loader />}>
          {carpeta.deudor && (
            <NombreComponent
              key={numero}
              nombre={carpeta.nombre}
              carpetaNumero={carpeta.numero}
            />
          )}
        </Suspense>
        <Suspense fallback={<Loader />}>{top}</Suspense>
        <ForwardBackwardNavButtons />
        <FilterDrawerButton
          id={RIGHT_DRAWER_ID}
          label="Abrir panel"
        />
      </div>
      <div className={styles.left}>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </div>
      <FilterDrawer id={RIGHT_DRAWER_ID}>
        <Suspense fallback={<Loader />}>{right}</Suspense>
      </FilterDrawer>
    </CarpetaFormProvider>
  );
}
