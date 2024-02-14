import { CarpetaFormProvider } from '#@/app/Context/carpeta-form-context';
import Modal from '#@/components/Modal';
import { prisma } from '#@/lib/connection/prisma';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { notFound } from 'next/navigation';
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
      const rawCarpeta = await prisma.carpeta.update(
        {
          where: {
            numero: Number(
              params.numero
            ),
          },
          data: {
            revisado: true,
          },
          include: {
            ultimaActuacion: true,
            deudor         : true,
            codeudor       : true,
            notas          : true,
            tareas         : true,
            demanda        : {
              include: {
                notificacion: {
                  include: {
                    notifiers: true,
                  },
                },
                medidasCautelares: true,
              },
            },
            procesos: {
              include: {
                juzgado: true,
              },
            },
          },
        }
      );

      const {
        demanda: rawDemanda
      } = rawCarpeta;

      if ( !rawCarpeta || !rawDemanda ) {
        return notFound();
      }

      const carpeta: IntCarpeta = {
        ...rawCarpeta,
        demanda: {
          ...rawDemanda,
          capitalAdeudado: rawDemanda.capitalAdeudado?.toNumber() ?? 0,
          avaluo         : rawDemanda.avaluo?.toNumber() ?? 0,
          liquidacion    : rawDemanda.liquidacion?.toNumber() ?? 0,
        },
      };
      return (
        <Modal>
          <CarpetaFormProvider
            key={params.numero}
            carpeta={carpeta}
          >
            {children}
          </CarpetaFormProvider>
        </Modal>
      );
}
