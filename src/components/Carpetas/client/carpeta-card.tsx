'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Route } from 'next';
import { MonCarpeta } from '#@/lib/types/carpetas';
import { DEFAULT_CIUDAD } from '#@/app/Hooks/useCarpetasreducer';
import { CarpetaCheckbox } from './carpeta-checkbox';
import { CategoryChip } from './category-chip';
import { RevisadoCheckBox } from '#@/app/Carpetas/revisado-checkbox';
import { JuzgadoComponent, JuzgadoErrorComponent } from '#@/components/Proceso/juzgado-component';
import { clean,
  deudorNombre,
  fmtDate,
  fmtMoney,
  getCategoryMeta,
  getEstadoBadges, } from './carpeta-meta';
import styles from './carpeta-card.module.css';

export function CarpetaCard( {
  carpeta,
  selected,
  onToggleSelect,
}: {
  carpeta       : MonCarpeta;
  selected      : boolean;
  onToggleSelect: () => void;
} ) {
  const [ expanded, setExpanded ] = useState( false );

  const {
    numero, nombre, id, category, tipoProceso, revisado, llaveProceso, notasCount, ciudad, juzgado, ultimaActuacion,
  } = carpeta;

  const categoryMeta = getCategoryMeta( category );
  const estadoBadges = getEstadoBadges( carpeta );
  const cedula = clean( carpeta.deudor?.cedula );
  const radicado = clean( carpeta.demanda?.radicado );
  const capital = fmtMoney( carpeta.demanda?.capitalAdeudado );
  const direccion = clean( carpeta.deudor?.direccion );
  const notas = ( carpeta.notas ?? [] )
    .map( ( nota ) => {
      return {
        text: clean( nota.text ) ?? '(sin texto)',
        date: fmtDate( nota.dueDate ) ?? '—',
      };
    } )
    .filter( ( nota ) => {
      return nota.text !== '(sin texto)';
    } )
    .slice( 0, 5 );

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerStart}>
          <CarpetaCheckbox
            checked={selected}
            onChange={onToggleSelect}
            ariaLabel={`Seleccionar carpeta ${ numero }`}
          />
          <Link
            href={`/Carpeta/${ numero }` as Route}
            className={styles.numeroLink}
          >
            {`CARPETA ${ numero }`}
          </Link>
        </div>
        <CategoryChip
          label={categoryMeta.label}
          color={categoryMeta.color}
        />
      </div>

      <div className={styles.nombre}>{nombre.trim() || 'Sin nombre'}</div>

      <div className={styles.badgeRow}>
        <CategoryChip
          label={tipoProceso || '—'}
          color="neutral"
          outline
        />
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

      <div className={styles.detailGrid}>
        <div>
          <div className={styles.detailLabel}>Juzgado</div>
          <div className={styles.detailValue}>
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
          </div>
        </div>
        <div>
          <div className={styles.detailLabel}>Última actuación</div>
          {ultimaActuacion
            ? (
                <>
                  <div className={styles.detailValue}>{ultimaActuacion.actuacion}</div>
                  {ultimaActuacion.anotacion && <div className={styles.detailMono}>{ultimaActuacion.anotacion}</div>}
                  <Link
                    href={`/Carpeta/${ numero }/ultimasActuaciones/${ ultimaActuacion.idProceso }` as Route}
                    className={styles.moreLink}
                  >
                    mostrar más
                  </Link>
                </>
              )
            : (
                <div className={styles.detailValue}>Sin actuaciones en la Rama Judicial</div>
              )}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerStart}>
          <span
            className="material-symbols-rounded"
            aria-hidden="true"
          >
            sticky_note_2
          </span>
          <span>{notasCount ?? 0}</span>
          <span aria-hidden="true">·</span>
          <span
            className={styles.llave}
            title={llaveProceso}
          >
            {llaveProceso}
          </span>
        </div>
        <button
          type="button"
          className={styles.expandButton}
          onClick={() => {
            return setExpanded( ( value ) => {
              return !value;
            } );
          }}
        >
          {expanded
            ? 'Ocultar'
            : 'Ver detalle'}
          <span
            className="material-symbols-rounded"
            aria-hidden="true"
          >
            {expanded
              ? 'expand_less'
              : 'expand_more'}
          </span>
        </button>
      </div>

      {expanded && (
        <div className={styles.expandPanel}>
          <div className={styles.detailGrid}>
            <div>
              <div className={styles.detailLabel}>Deudor</div>
              <div className={styles.detailValue}>{deudorNombre( carpeta ) ?? nombre.trim() ?? '—'}</div>
            </div>
            <div>
              <div className={styles.detailLabel}>Cédula / NIT</div>
              <div className={styles.detailMono}>{cedula ?? '—'}</div>
            </div>
            <div>
              <div className={styles.detailLabel}>Capital adeudado</div>
              <div className={styles.detailMono}>{capital ?? 'No registrado'}</div>
            </div>
            <div>
              <div className={styles.detailLabel}>Radicado</div>
              <div className={styles.detailMono}>{radicado ?? '—'}</div>
            </div>
            <div className={styles.detailFull}>
              <div className={styles.detailLabel}>Dirección</div>
              <div className={styles.detailValue}>{direccion ?? '—'}</div>
            </div>
            <div className={styles.detailFull}>
              <div className={styles.detailLabel}>Ciudad</div>
              <div className={styles.detailValue}>{ciudad ?? DEFAULT_CIUDAD}</div>
            </div>
          </div>

          {notas.length > 0 && (
            <div className={styles.notas}>
              <div className={styles.detailLabel}>Notas recientes</div>
              {notas.map( ( nota, index ) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <div
                    key={index}
                    className={styles.nota}
                  >
                    <span className={styles.notaDate}>{nota.date}</span>
                    <span>{nota.text}</span>
                  </div>
                );
              } )}
            </div>
          )}
        </div>
      )}

      <div className={styles.revisadoRow}>
        <span className={styles.detailLabel}>Revisado</span>
        <RevisadoCheckBox
          numero={numero}
          id={id}
          initialRevisadoState={revisado}
        />
      </div>
    </div>
  );
}
