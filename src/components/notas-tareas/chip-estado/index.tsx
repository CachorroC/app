import { CSSProperties } from 'react';
import styles from './chip-estado.module.css';

type EstadoDef = {
  label: string;
  clase: string;
  icono: string;
};

// Una sola tabla de tokens gobierna las cinco variantes visuales,
// compartida entre notas y tareas.
const ESTADO_DEFS: Record<string, EstadoDef> = {
  pendiente: {
    label: 'Pendiente',
    clase: styles.pendiente,
    icono: 'schedule' 
  },
  'en-revision': {
    label: 'En revisión',
    clase: styles.enRevision,
    icono: 'rate_review' 
  },
  atendida: {
    label: 'Atendida',
    clase: styles.atendida,
    icono: 'check_circle' 
  },
  vencida: {
    label: 'Vencida',
    clase: styles.vencida,
    icono: 'error' 
  },
  archivada: {
    label: 'Archivada',
    clase: styles.archivada,
    icono: 'inventory_2' 
  },
};

// Normaliza las claves de enum del esquema (EstadoNote / EstadoTarea)
// hacia las cinco variantes visuales del chip. EN_PROGRESO (Tarea) y
// EN_REVISION (Nota) colapsan a la misma variante a propósito.
const ESTADO_NORMALIZA: Record<string, string> = {
  PENDIENTE  : 'pendiente',
  EN_REVISION: 'en-revision',
  EN_PROGRESO: 'en-revision',
  ATENDIDA   : 'atendida',
  ARCHIVADA  : 'archivada',
  VENCIDA    : 'vencida',
};

export type ChipEstadoProps = {
  variante : string;
  conIcono?: boolean;
  style?   : CSSProperties;
};

export const ChipEstado = ( {
  variante, conIcono = true, style 
}: ChipEstadoProps ) => {
  const clave = ESTADO_NORMALIZA[ variante ] || variante;
  const d = ESTADO_DEFS[ clave ] || ESTADO_DEFS.pendiente;

  return (
    <span className={`${ styles.chip } ${ d.clase } ${ conIcono
      ? styles.conIcono
      : '' }`} style={style}
    >
      {conIcono && <span className={`material-symbols-rounded ${ styles.icono }`} aria-hidden="true">{d.icono}</span>}
      {d.label}
    </span>
  );
};
