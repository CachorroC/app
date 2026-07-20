import { formatoFechaCO } from '#@/lib/compartido/fecha';
import { TareaResumen } from './tipos';

export type TareaVista = {
  id         : string;
  titulo     : string;
  carpeta    : string | null;
  fechaLimite: string | null;
  responsable: string | null;
  estado     : string;
  prioridad  : 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
  esTermino? : boolean;
  origenNota?: boolean;
  vencida?   : boolean;
};

export function aTareaVista( tarea: TareaResumen ): TareaVista {
  return {
    id     : tarea.id,
    titulo : tarea.titulo,
    carpeta: tarea.caso
      ? `${ tarea.caso.referencia } · ${ tarea.caso.nombre }`
      : null,
    fechaLimite: formatoFechaCO( tarea.fechaLimite ),
    responsable: tarea.responsable,
    estado     : tarea.estado,
    prioridad  : tarea.prioridad,
    esTermino  : tarea.esTermino,
    origenNota : Boolean( tarea.origenNota ),
    vencida    : tarea.estado === 'VENCIDA',
  };
}
