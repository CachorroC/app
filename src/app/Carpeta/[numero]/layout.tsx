import { CarpetaFormProvider } from '#@/app/context/carpeta-form-context';
import styles from '#@/styles/layout.module.css';
import { Metadata, ResolvingMetadata } from 'next';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
      top: ReactNode;
  right: ReactNode;
  params: { numero: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  {
    params,
  }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {
    numero
  } = params;

  // fetch data
  const product = await fetch(
    `https://beta.rsasesorjuridico.com/api/Carpeta/${ numero }`
  )
    .then(
      (
        res
      ) => {
        return res.json();
      }
    );

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = ( await parent ).openGraph?.images || [];

  return {
    title    : product.nombre,
    openGraph: {
      images: [
        '/some-specific-page-image.jpg',
        ...previousImages
      ],
    },
  };
}


export default function LayoutProcesosMain(
  {
    children,
    top, right, params
  }: Props
) {
  return (
    <>
      <CarpetaFormProvider  numero={params.numero }>
        <div className={styles.top}>{top}</div>
        <div className={styles.leftColumn}>{children}</div>
        <div className={ styles.right }>{ right }</div>
      </CarpetaFormProvider>
    </>
  );
}
