import { prisma } from '#@/lib/connection/prisma';

export default async function getCarpetas () {


      const rawCarpetas = await prisma.carpeta.findMany(
        {
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
                    notifiers: true
                  }
                },
                medidasCautelares: true
              }
            },
            procesos: {
              include: {
                juzgado: true
              }
            },
          }
        }
      );
      return  [ ...rawCarpetas ].sort(
        (
          a, b
        ) => {
                  if ( !a.fecha || a.fecha === undefined || a.fecha.toString() === 'Invalid Date' ) {
                    return 1;
                  }

                  if ( !b.fecha || b.fecha === undefined || b.fecha.toString() === 'Invalid Date' ) {
                    return -1;
                  }

                  const x = a.fecha;

                  const y = b.fecha;

                  if ( x < y ) {
                    return 1;
                  }

                  if ( x > y ) {
                    return -1;
                  }

                  return 0;
        }
      );
}
