import { CarpetaFormProvider } from '#@/app/context/carpeta-form-context';
import styles from '#@/styles/layout.module.css';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  top: ReactNode;
  right: ReactNode;
  params: { numero: string };
};

/*
export async function generateMetadata(
  {
    params
  }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const {
    numero
  } = params;


  const product = await fetch(
    `/api/Carpeta/${ numero }`,
  )
    .then(
      (
        res
      ) => {
        return res.json();
      }
    );


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
 */
export default function LayoutProcesosMain(
  {
    children,
    top,
    right,
    params: {
      numero
    },
  }: Props
) {
  return (
    <>
      <CarpetaFormProvider key={numero} numero={numero}>
        <div className={styles.top}>{top}</div>
        <div className={styles.leftColumn}>{children}</div>
        <div className={styles.right}>{right}</div>
      </CarpetaFormProvider>
    </>
  );
}
