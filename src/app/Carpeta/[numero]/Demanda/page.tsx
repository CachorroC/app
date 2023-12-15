import { carpetasCollection } from '#@/lib/connection/collections';
import { notFound } from 'next/navigation';

export default async function DemandaPage(
  {
    params,
  }: {
    params: { numero: string };
  }
) {
      const collection = await carpetasCollection();

      const carpeta = await collection.findOne(
        {
          numero: Number(
            params.numero
          )
        }
      );

      if ( !carpeta ) {
        notFound();
      }

      const {
        demanda
      } = carpeta;

      const {
        capitalAdeudado
      } = demanda;

      const moneyFixed = new Intl.NumberFormat(
        'es-CO', {
          style          : 'currency',
          currency       : 'COP',
          currencyDisplay: 'name',
        }
      )
            .format(
              capitalAdeudado
                ? capitalAdeudado
                : 1000000
            );
      return (
        <div>
          <h1>{demanda.llaveProceso}</h1>
          <p>{capitalAdeudado && moneyFixed}</p>
        </div>
      );
}
