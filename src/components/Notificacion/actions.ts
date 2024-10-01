import { prisma } from '#@/lib/connection/prisma';
import { Notificacion } from '#@/lib/types/carpetas';
import { Prisma } from '@prisma/client';

export async function editNotificacion( notificacion: Notificacion ) {
  try {
    const newNotifiers: Prisma.NotifierUpdateManyWithWhereWithoutNotificacionInput[]
      = notificacion.notifiers.map( ( notifier ) => {
        return {
          where: {
            tipo         : notifier.tipo,
            carpetaNumero: notificacion.id,
          },
          data: {
            ...notifier,
          },
        };
      } );

    const newNotificacion: Prisma.NotificacionUpdateInput = {
      ...notificacion,
      notifiers: {
        updateMany: newNotifiers,
      },
    };

    const editor = await prisma.notificacion.update( {
      where: {
        id: notificacion.id,
      },
      data   : newNotificacion,
      include: {
        notifiers: true,
      },
    } );

    return {
      success: true,
      data   : editor as Notificacion,
    };
  } catch ( error ) {
    console.log( error );

    return {
      success: false,
      data   : null,
    };
  }
}
