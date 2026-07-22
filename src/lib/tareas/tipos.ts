import { CasoResumenDTO, EtiquetaDTO } from '#@/lib/compartido/tipos';
import { EstadoTareaVisible } from './estado';
import { GrupoVencimiento } from './grupos';

export type PrioridadTareaVisible = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export type TareaResumen = {
  id          : string;
  titulo      : string;
  descripcion : string | null;
  estado      : EstadoTareaVisible;
  prioridad   : PrioridadTareaVisible;
  fechaLimite : string | null;
  esTermino   : boolean;
  responsable : string | null;
  caso        : CasoResumenDTO | null;
  etiquetas   : EtiquetaDTO[];
  origenNota  : { id: string; titulo: string } | null;
  creadaEn    : string;
  editadaEn   : string;
  completadaEn: string | null;
};

export type FiltrosTareas = {
  q?           : string;
  estado?      : string[];
  caso?        : string;
  termino?     : boolean;
  desde?       : string;
  hasta?       : string;
  asignadasAMi?: boolean;
};

export type GrupoTareasResultado = {
  grupo : GrupoVencimiento;
  tareas: TareaResumen[];
};
