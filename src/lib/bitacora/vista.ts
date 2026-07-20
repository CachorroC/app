import { formatoFechaCO } from '#@/lib/compartido/fecha';
import { NotaResumen } from './tipos';

export type EtiquetaRefVista = { texto: string; color: string };

export type NotaVista = {
  id       : string;
  titulo   : string;
  carpeta  : string | null;
  creada   : string;
  editada  : string;
  estado   : string;
  etiquetas: EtiquetaRefVista[];
  preview  : string;
  fijada?  : boolean;
};

/** Adapta el DTO (fechas ISO, caso estructurado) a lo que espera TarjetaNota. */
export function aNotaVista( nota: NotaResumen ): NotaVista {
  return {
    id     : nota.id,
    titulo : nota.titulo,
    carpeta: nota.caso
      ? `${ nota.caso.referencia } · ${ nota.caso.nombre }`
      : null,
    creada   : formatoFechaCO( nota.creadaEn ) ?? '',
    editada  : formatoFechaCO( nota.editadaEn ) ?? '',
    estado   : nota.estado,
    etiquetas: nota.etiquetas.map( ( e ) => {
      return {
        texto: e.nombre,
        color: e.color 
      };
    } ),
    preview: nota.resumen ?? '',
    fijada : nota.fijada,
  };
}
