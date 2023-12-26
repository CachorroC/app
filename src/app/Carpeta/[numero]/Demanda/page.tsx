import { prisma } from '#@/lib/connection/prisma';
import { notFound } from 'next/navigation';

export default async function DemandaPage(
  {
    params,
  }: {
    params: { numero: string };
  } 
) {
      const carpeta = await prisma.carpeta.findUnique(
        {
          where: {
            numero: Number(
              params.numero 
            ),
          },
          include: {
            deudor         : true,
            codeudor       : true,
            ultimaActuacion: true,
            procesos       : {
              include: {
                juzgado: true,
              },
            },
            demanda: {
              include: {
                medidasCautelares: true,
                notificacion     : true,
              },
            },
          },
        } 
      );

      if ( !carpeta ) {
        notFound();
      }

      const {
        demanda, llaveProceso 
      } = carpeta;

      if ( !demanda ) {
        return notFound();
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
                ? Number(
                  capitalAdeudado.toString() 
                )
                : 1000000 
            );
      return (
        <div>
          <h1>{llaveProceso}</h1>
          <p>{capitalAdeudado && moneyFixed}</p>
        </div>
      );
}
