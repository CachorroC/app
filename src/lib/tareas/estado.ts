import { EstadoTarea } from '#@/app/generated/prisma/enums';

export type EstadoTareaVisible = EstadoTarea | 'VENCIDA';

/**
 * VENCIDA no se guarda: se deriva de estado + fechaLimite. Calcular siempre
 * aquí, del lado del servidor, durante el mapeo a DTO — nunca en un
 * componente, o la agrupación y el chip pueden mostrar cosas distintas
 * después de medianoche.
 */
export function estadoVisible( t: { estado: EstadoTarea; fechaLimite: Date | null } ): EstadoTareaVisible {
  if ( t.estado === EstadoTarea.PENDIENTE && t.fechaLimite && t.fechaLimite < new Date() ) {
    return 'VENCIDA';
  }

  return t.estado;
}
