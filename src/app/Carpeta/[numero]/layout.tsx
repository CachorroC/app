import { CarpetaFormProvider } from '#@/app/context/carpeta-form-context';
import { Loader } from '#@/components/Loader';
import { NombreComponent } from '#@/components/nombre';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { getBaseUrl } from '#@/lib/project/helper';
import styles from '#@/styles/layout.module.css';
import { Metadata, Route } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import { NotasLinkList } from './notas-list';

type Props = {
  children: ReactNode;
  top: ReactNode;
  right: ReactNode;
  params: { numero: string };
};


export async function generateMetadata(
  {
    params
  }: Props,
): Promise<Metadata> {
  const {
    numero
  } = params;


  const product = await fetch(
    `${ getBaseUrl() }/api/Carpeta/${ numero }`,
  )
    .then(
      (
        res
      ) => {
        return res.json();
      }
    );

  return {
    title   : product.nombre,
    keywords: [
      product.deudor.primerNomnbre,
      product.tipoProceso,
      product.category,
      product.deudor.primerApellido
    ]
  };
}

export default async function LayoutCarpetaMain(
  {
    children,
    top,
    right,
    params,
  }: Props
) {
  const carpeta = await getCarpetabyNumero(
    Number(
      params.numero
    )
  );

  if ( !carpeta ) {
    return notFound();
  }

  return (
    <>
      <CarpetaFormProvider key={params.numero} carpeta={carpeta}>
        <div className={ styles.top }>
          <Suspense fallback={ <Loader /> }>
            <Link href={ `/Carpeta/${ params.numero }` as Route}>
              <NombreComponent
                key={params.numero}
                deudor={carpeta.deudor}
              />
            </Link>

          </Suspense>
          { top }
        </div>
        <div className={styles.leftColumn}>{children}</div>
        <div className={ styles.right }>

          {right}
          <NotasLinkList carpetaNumero={Number(
            params.numero
          )} key={params.numero}/>
        </div>

      </CarpetaFormProvider>
    </>
  );
}
