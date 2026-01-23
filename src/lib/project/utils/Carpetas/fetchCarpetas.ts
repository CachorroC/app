import  prisma  from '#@/lib/connection/prisma';

export async function fetchCarpetaByNumero(
  {
    numero
  }: { numero: number }
) {
  const carpeta = await prisma.carpeta.findFirstOrThrow(
    {
      where: {
        numero: numero,
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

  return JSON.stringify(
    carpeta
  );
}
