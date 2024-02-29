import { CarpetaFormProvider } from '#@/app/Context/carpeta-form-context';
import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { ReactNode } from 'react';

export default async function Page(
  {
    params,
    children,
  }: {
    params: {
      numero: string;
    };
    children: ReactNode;
  }
) {
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
          {children}
        </CarpetaFormProvider>

      );
}
