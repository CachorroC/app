import { CasoResumenDTO, EtiquetaDTO } from '#@/lib/compartido/tipos';

export type EstadoNotaVisible = 'PENDIENTE' | 'EN_REVISION' | 'ATENDIDA' | 'ARCHIVADA';

export type NotaResumen = {
  id                    : string;
  titulo                : string;
  resumen               : string | null;
  estado                : EstadoNotaVisible;
  fijada                : boolean;
  caso                  : CasoResumenDTO | null;
  etiquetas             : EtiquetaDTO[];
  creadaEn              : string;
  editadaEn             : string;
  totalItemsVerificacion: number;
  itemsCompletados      : number;
};

export type BloqueItemDTO = {
  id          : string;
  texto       : string;
  orden       : number;
  completado  : boolean;
  completadoEn: string | null;
  tareaId     : string | null;
};

export type BloqueParrafoDTO = {
  id   : string;
  tipo : 'PARRAFO';
  orden: number;
  texto: string;
};

export type BloqueListaDTO = {
  id    : string;
  tipo  : 'LISTA' | 'VERIFICACION';
  orden : number;
  titulo: string | null;
  items : BloqueItemDTO[];
};

export type BloqueDTO = BloqueParrafoDTO | BloqueListaDTO;

export type NotaDetalle = Omit<NotaResumen, 'totalItemsVerificacion' | 'itemsCompletados'> & {
  bloques: BloqueDTO[];
};

export type FiltrosNotas = {
  q?     : string;
  estado?: string[];
  caso?  : string;
  orden? : 'editada' | 'creada' | 'titulo';
  cursor?: string;
};

export type ListaNotasResultado = {
  notas  : NotaResumen[];
  fijadas: NotaResumen[];
  hasMore: boolean;
  cursor : string | null;
};
