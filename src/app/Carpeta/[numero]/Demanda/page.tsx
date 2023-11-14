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

  const moneyFixed = new Intl.NumberFormat(
    'es-CO', {
      style          : 'currency',
      currency       : 'COP',
      currencyDisplay: 'name',
    }
  )
    .format(
      demanda.capitalAdeudado.toNumber()
    );
  return (
    <div>
      <h1>{ demanda.expediente }</h1>
      <p>{moneyFixed}</p>
    </div>
  );
}