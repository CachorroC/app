import { CarpetaFormProvider } from '#@/app/Context/carpeta-form-context';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Layout (
  {
    params, children
  }: { params: { numero: string; idProceso: string }; children: ReactNode }
) {

      if ( params.idProceso === 'idProceso' ) {
        return notFound();
      }

      const carpeta = await getCarpetabyNumero(
        Number(
          params.numero
        )
      );

      return (
        <CarpetaFormProvider
          key={params.numero}
          carpeta={carpeta}
        >

          { children }

        </CarpetaFormProvider>
      );
}