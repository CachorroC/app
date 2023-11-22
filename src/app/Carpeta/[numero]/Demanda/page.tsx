import { prisma } from '#@/lib/connection/prisma';
import { notFound } from 'next/navigation';

export default async function DemandaPage (
  {
    params
  }: { params: { numero: string } }
) {
      const demanda = await prisma.demanda.findFirst(
        {
          where: {
            carpetaNumero: Number(
              params.numero
            )
          }
        }
      );

      if ( !demanda ) {
        notFound();
      }

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
                ? capitalAdeudado.toNumber()
                : 1000000
            );
      return (
        <div>
          <h1>{ demanda.expediente }</h1>
          <p>{ capitalAdeudado && moneyFixed}</p>
        </div>
      );
}