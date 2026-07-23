import Link from 'next/link';
import { Route } from 'next';
import { MonCarpeta } from '#@/lib/types/carpetas';
import { CarpetaCheckbox } from './carpeta-checkbox';
import { CategoryChip } from './category-chip';
import { RevisadoCheckBox } from '#@/app/dashboard/Carpetas/revisado-checkbox';
import { ActuacionTableComponent,
  ActuacionTableErrorComponent, } from '#@/components/Actuaciones/actuacion-table-component';
import { JuzgadoComponent,
  JuzgadoErrorComponent, } from '#@/components/Proceso/juzgado-component';
import { clean,
  fmtDate,
  getCategoryMeta,
  getEstadoBadges, } from './carpeta-meta';
import styles from './carpeta-table-row.module.css';

export function CarpetaTableRow( {
  carpeta,
  selected,
  onToggleSelect,
}: {
  carpeta       : MonCarpeta;
  selected      : boolean;
  onToggleSelect: () => void;
} ) {
  const {
    numero,
    nombre,
    id,
    category,
    tipoProceso,
    revisado,
    llaveProceso,
    notasCount,
    fecha,
    juzgado,
    ultimaActuacion,
  } = carpeta;

  const categoryMeta = getCategoryMeta( category );
  const estadoBadges = getEstadoBadges( carpeta );
  const radicado = clean( carpeta.demanda?.radicado );
  const carpetaHref: Route<`/dashboard/Carpeta/${number}`> = `/dashboard/Carpeta/${ numero }`;

  return (
    <tr
      className={styles.row}
      data-selected={selected}
    >
      <td className={styles.checkboxCell}>
        <CarpetaCheckbox
          checked={selected}
          onChange={onToggleSelect}
          ariaLabel={`Seleccionar carpeta ${ numero }`}
        />
      </td>
      <td className={styles.mono}>
        <Link
          href={carpetaHref}
          className={styles.numeroLink}
        >
          {numero}
        </Link>
      </td>
      <td className={styles.nombre}>{nombre.trim() || 'Sin nombre'}</td>
      <td className={styles.mono}>{fmtDate( fecha ) ?? '—'}</td>
      <td>
        <CategoryChip
          label={categoryMeta.label}
          color={categoryMeta.color}
        />
      </td>
      <td>
        <CategoryChip
          label={tipoProceso || '—'}
          color="neutral"
          outline
        />
      </td>
      <td>
        <div className={styles.estadoStack}>
          {estadoBadges.map( ( badge ) => {
            return (
              <CategoryChip
                key={badge.label}
                label={badge.label}
                color={badge.color}
              />
            );
          } )}
        </div>
      </td>
      <td className={styles.juzgado}>
        {juzgado
          ? (
              <JuzgadoComponent
                key={numero}
                juzgado={juzgado}
              />
            )
          : (
              <JuzgadoErrorComponent />
            )}
      </td>
      {ultimaActuacion
        ? (
            <ActuacionTableComponent
              key={numero}
              numero={numero}
              incomingActuacion={ultimaActuacion}
            />
          )
        : (
            <ActuacionTableErrorComponent />
          )}
      <td className={styles.notasCell}>
        <span
          className="material-symbols-rounded"
          aria-hidden="true"
        >
          sticky_note_2
        </span>
        {notasCount ?? 0}
      </td>
      <td
        className={styles.mono}
        title={radicado ?? undefined}
      >
        {radicado ?? '—'}
      </td>
      <td
        className={styles.mono}
        title={llaveProceso}
      >
        {llaveProceso}
      </td>
      <td>
        <RevisadoCheckBox
          numero={numero}
          id={id}
          initialRevisadoState={revisado}
        />
      </td>
    </tr>
  );
}
