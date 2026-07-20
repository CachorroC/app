import { GrupoVencimiento, GRUPO_LABEL } from '#@/lib/tareas/grupos';
import { TareaVista } from '#@/lib/tareas/vista';
import { FilaTarea } from '../fila-tarea';
import styles from './grupo-tareas.module.css';

const ICONOS: Record<GrupoVencimiento, string> = {
  VENCIDAS    : 'error',
  HOY         : 'today',
  ESTA_SEMANA : 'date_range',
  MAS_ADELANTE: 'event_upcoming',
  SIN_FECHA   : 'event_busy',
};

export type GrupoTareasProps = {
  grupo : GrupoVencimiento;
  tareas: TareaVista[];
};

export const GrupoTareas = ( {
  grupo, tareas 
}: GrupoTareasProps ) => {
  return (
    <section className={styles.grupo}>
      <h3 className={styles.encabezado}>
        <span
          className={`material-symbols-rounded ${ styles.icono } ${ grupo === 'VENCIDAS'
            ? styles.vencidas
            : '' }`}
          aria-hidden="true"
        >
          {ICONOS[ grupo ]}
        </span>
        {GRUPO_LABEL[ grupo ]}
        <span className={styles.contador}>{tareas.length}</span>
      </h3>
      <div className={styles.lista}>
        {tareas.map( ( t ) => {
          return <FilaTarea key={t.id} tarea={t} />;
        } )}
      </div>
    </section>
  );
};
