import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import { notFound } from 'next/navigation';
import CurrencyInput from 'react-currency-input-field';

export default async function Page (
  {
    params
  }: {params: {numero: string}}
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
          <CurrencyInput
            allowDecimals={ false }
            suffix={'pesos colombianos'}
            intlConfig={{
              locale  : 'es-CO',
              currency: 'COP'
            }}
          />
        </>
      );
}