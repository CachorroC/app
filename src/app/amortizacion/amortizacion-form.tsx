'use client';

import { FormEvent, ReactNode, useMemo, useState, useTransition } from 'react';
import { Icon } from '#@/components/ui';
import { Accordion } from '#@/components/Accordion';
import { useDebounce } from '#@/app/Hooks/useDebounce';
import { calcularPlanAmortizacion } from '#@/lib/amortizacion/uvr-amortizacion-core';
import { fmtUVR } from '#@/lib/format';
import { amortizacionInputSchema } from './schema';
import { toEntradaAmortizacion } from './to-entrada';
import { generarAmortizacionXlsx } from './actions';
import { downloadXlsx } from './download-xlsx';
import styles from './amortizacion.module.css';

interface FieldState {
  montoUVR         : string;
  tasaEAPct        : string;
  numeroCuotas     : string;
  fechaPrimeraCuota: string;
  cuotaEsperadaUVR : string;
}

interface CambioTasaRow {
  id        : string;
  desdeCuota: string;
  tasaEAPct : string;
}

const CAMPOS_INICIALES: FieldState = {
  montoUVR         : '',
  tasaEAPct        : '',
  numeroCuotas     : '',
  fechaPrimeraCuota: '',
  cuotaEsperadaUVR : '',
};

function buildCandidate(
  fields: FieldState, rows: CambioTasaRow[] 
): unknown {
  return {
    montoUVR         : Number( fields.montoUVR ),
    tasaEAPct        : Number( fields.tasaEAPct ),
    numeroCuotas     : Number( fields.numeroCuotas ),
    fechaPrimeraCuota: fields.fechaPrimeraCuota,
    cuotaEsperadaUVR : fields.cuotaEsperadaUVR.trim() === ''
      ? undefined
      : Number( fields.cuotaEsperadaUVR ),
    cambiosTasa: rows.map( ( row ) => {
      return {
        desdeCuota: Number( row.desdeCuota ),
        tasaEAPct : Number( row.tasaEAPct ),
      };
    } ),
  };
}

function fmtFechaCorta( fecha: Date ): string {
  return fecha.toLocaleDateString(
    'es-CO', {
      day  : '2-digit',
      month: 'short',
      year : 'numeric',
    }
  );
}

interface FieldProps {
  id         : string;
  label      : string;
  value      : string;
  // eslint-disable-next-line no-unused-vars -- type-only signature, not a real binding
  onChange   : ( value: string ) => void;
  type?      : 'text' | 'number' | 'date';
  step?      : string;
  min?       : string;
  inputMode? : 'decimal' | 'numeric';
  errors?    : string[];
  helperText?: string;
  wide?      : boolean;
}

function Field( {
  id,
  label,
  value,
  onChange,
  type = 'text',
  step,
  min,
  inputMode,
  errors,
  helperText,
  wide,
}: FieldProps ) {
  const hasError = !!errors?.length;
  const errorId = hasError
    ? `${ id }-error`
    : undefined;
  const helperId = !hasError && helperText
    ? `${ id }-help`
    : undefined;

  return (
    <div className={`${ styles.field } ${ wide
      ? styles.fieldWide
      : '' }`}
    >
      <label
        htmlFor={id}
        className={`${ styles.label } ${ hasError
          ? styles.labelError
          : '' }`}
      >
        {label}
      </label>
      <span
        className={`${ styles.inputWrapper } ${ hasError
          ? styles.inputWrapperError
          : '' }`}
      >
        <input
          id={id}
          type={type}
          step={step}
          min={min}
          inputMode={inputMode}
          value={value}
          className={styles.input}
          aria-invalid={hasError}
          aria-describedby={errorId ?? helperId}
          onChange={( e ) => {
            onChange( e.target.value );
          }}
        />
      </span>
      {hasError
        ? (
            <div
              id={errorId}
              className={styles.errorText}
            >
              {errors?.[ 0 ]}
            </div>
          )
        : null}
      {!hasError && helperText
        ? (
            <div
              id={helperId}
              className={styles.helperText}
            >
              {helperText}
            </div>
          )
        : null}
    </div>
  );
}

export function AmortizacionForm() {
  const [
    fields,
    setFields
  ] = useState<FieldState>( CAMPOS_INICIALES );
  const [
    cambiosTasaRows,
    setCambiosTasaRows
  ] = useState<CambioTasaRow[]>( [] );
  const [
    hasAttemptedSubmit,
    setHasAttemptedSubmit
  ] = useState( false );
  const [
    fieldErrors,
    setFieldErrors
  ] = useState<Record<string, string[]>>( {} );
  const [
    resultState,
    setResultState
  ] = useState<'idle' | 'success' | 'error'>( 'idle' );
  const [
    serverError,
    setServerError
  ] = useState<string | undefined>();
  const [
    isPending,
    startTransition
  ] = useTransition();

  const debouncedFields = useDebounce(
    fields, 400
  );
  const debouncedRows = useDebounce(
    cambiosTasaRows, 400
  );

  const plan = useMemo(
    () => {
      const candidate = buildCandidate(
        debouncedFields, debouncedRows
      );
      const parsed = amortizacionInputSchema.safeParse( candidate );

      if ( !parsed.success ) {
        return null;
      }

      try {
        return calcularPlanAmortizacion( toEntradaAmortizacion( parsed.data ) );
      } catch {
        return null;
      }
    }, [
      debouncedFields,
      debouncedRows
    ]
  );

  function updateField(
    key: keyof FieldState, value: string
  ) {
    setFields( ( prev ) => {
      return {
        ...prev,
        [ key ]: value,
      };
    } );
  }

  function addCambioTasa() {
    setCambiosTasaRows( ( prev ) => {
      return [
        ...prev,
        {
          id        : crypto.randomUUID(),
          desdeCuota: '',
          tasaEAPct : '',
        },
      ];
    } );
  }

  function updateCambioTasaField(
    id: string, patch: Partial<Omit<CambioTasaRow, 'id'>>
  ) {
    setCambiosTasaRows( ( prev ) => {
      return prev.map( ( row ) => {
        return row.id === id
          ? {
              ...row,
              ...patch,
            }
          : row;
      } );
    } );
  }

  function removeCambioTasa( id: string ) {
    setCambiosTasaRows( ( prev ) => {
      return prev.filter( ( row ) => {
        return row.id !== id;
      } );
    } );
  }

  function handleSubmit( e: FormEvent ) {
    e.preventDefault();
    setHasAttemptedSubmit( true );

    const candidate = buildCandidate(
      fields, cambiosTasaRows
    );
    const parsed = amortizacionInputSchema.safeParse( candidate );

    if ( !parsed.success ) {
      const errors: Record<string, string[]> = {};

      for ( const issue of parsed.error.issues ) {
        const path = issue.path.join( '.' );

        if ( !path ) {
          continue;
        }

        ( errors[ path ] ??= [] ).push( issue.message );
      }

      setFieldErrors( errors );
      setServerError( undefined );
      setResultState( 'error' );

      return;
    }

    setFieldErrors( {} );
    startTransition( async () => {
      const res = await generarAmortizacionXlsx( parsed.data );

      if ( res.ok ) {
        downloadXlsx(
          res.filename, res.base64
        );
        setServerError( undefined );
        setResultState( 'success' );
      } else {
        setServerError( res.error );
        setResultState( 'error' );
      }
    } );
  }

  const errorsFor = ( path: string ): string[] | undefined => {
    return hasAttemptedSubmit
      ? fieldErrors[ path ]
      : undefined;
  };

  const primerTramo = plan?.tramos[ 0 ];
  const ultimaFila = plan?.filas.at( -1 );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Icon
          name="calculate"
          className={styles.headerIcon}
          size={32}
        />
        <div>
          <h1 className={styles.title}>Calculadora de amortización UVR</h1>
        </div>
      </header>
      <p className={styles.intro}>
        Calcule la cuota, los intereses y el plan de pagos de un crédito
        hipotecario denominado en UVR, y descargue el plan completo en Excel.
      </p>

      <form
        className={styles.layout}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className={styles.card}>
          <div className={styles.formGrid}>
            <Field
              id="montoUVR"
              label="Monto del crédito (UVR)"
              value={fields.montoUVR}
              onChange={( v ) => {
                return updateField(
                  'montoUVR', v
                );
              }}
              type="number"
              step="any"
              min="0"
              inputMode="decimal"
              errors={errorsFor( 'montoUVR' )}
            />
            <Field
              id="tasaEAPct"
              label="Tasa E.A. (%)"
              value={fields.tasaEAPct}
              onChange={( v ) => {
                return updateField(
                  'tasaEAPct', v
                );
              }}
              type="number"
              step="any"
              min="0"
              inputMode="decimal"
              helperText="Ej. 8,30 para 8,30 %"
              errors={errorsFor( 'tasaEAPct' )}
            />
            <Field
              id="numeroCuotas"
              label="Número de cuotas"
              value={fields.numeroCuotas}
              onChange={( v ) => {
                return updateField(
                  'numeroCuotas', v
                );
              }}
              type="number"
              step="1"
              min="1"
              inputMode="numeric"
              errors={errorsFor( 'numeroCuotas' )}
            />
            <Field
              id="fechaPrimeraCuota"
              label="Fecha primera cuota"
              value={fields.fechaPrimeraCuota}
              onChange={( v ) => {
                return updateField(
                  'fechaPrimeraCuota', v
                );
              }}
              type="date"
              errors={errorsFor( 'fechaPrimeraCuota' )}
            />
            <Field
              id="cuotaEsperadaUVR"
              label="Cuota esperada (UVR)"
              value={fields.cuotaEsperadaUVR}
              onChange={( v ) => {
                return updateField(
                  'cuotaEsperadaUVR', v
                );
              }}
              type="number"
              step="any"
              min="0"
              inputMode="decimal"
              helperText="Opcional, solo para validación"
              errors={errorsFor( 'cuotaEsperadaUVR' )}
              wide
            />
          </div>

          <Accordion title="Tasa escalonada">
            <div className={styles.cambiosTasaSection}>
              {cambiosTasaRows.map( (
                row, i
              ) => {
                return (
                  <div
                    className={styles.cambioRow}
                    key={row.id}
                  >
                    <Field
                      id={`cambioDesdeCuota-${ row.id }`}
                      label="Desde cuota"
                      value={row.desdeCuota}
                      onChange={( v ) => {
                        return updateCambioTasaField(
                          row.id, {
                            desdeCuota: v,
                          }
                        );
                      }}
                      type="number"
                      step="1"
                      min="2"
                      inputMode="numeric"
                      errors={errorsFor( `cambiosTasa.${ i }.desdeCuota` )}
                    />
                    <Field
                      id={`cambioTasaEAPct-${ row.id }`}
                      label="Tasa E.A. (%)"
                      value={row.tasaEAPct}
                      onChange={( v ) => {
                        return updateCambioTasaField(
                          row.id, {
                            tasaEAPct: v,
                          }
                        );
                      }}
                      type="number"
                      step="any"
                      min="0"
                      inputMode="decimal"
                      errors={errorsFor( `cambiosTasa.${ i }.tasaEAPct` )}
                    />
                    <button
                      type="button"
                      className={styles.removeRowButton}
                      aria-label="Eliminar cambio de tasa"
                      onClick={() => {
                        removeCambioTasa( row.id );
                      }}
                    >
                      <Icon name="delete" />
                    </button>
                  </div>
                );
              } )}
              <button
                type="button"
                className={styles.addRowButton}
                onClick={addCambioTasa}
              >
                <Icon
                  name="add"
                  size={18}
                />
                Agregar cambio de tasa
              </button>
            </div>
          </Accordion>

          <div className={styles.actionsRow}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isPending}
            >
              <Icon
                name={isPending
                  ? 'progress_activity'
                  : 'download'}
                className={isPending
                  ? styles.spinner
                  : undefined}
                size={18}
              />
              {isPending
                ? 'Generando…'
                : 'Descargar Excel'}
            </button>
          </div>

          <StatusRegion
            isPending={isPending}
            resultState={resultState}
            serverError={serverError}
          />
        </div>

        <aside
          className={styles.summaryPanel}
          aria-live="polite"
        >
          <h2 className={styles.summaryTitle}>Resumen</h2>
          {plan && primerTramo && ultimaFila
            ? (
                <>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Cuota (1er tramo)</span>
                    <span className={styles.summaryValue}>
                      {fmtUVR( primerTramo.cuota )}
                      {' '}
                      UVR
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Total intereses</span>
                    <span className={styles.summaryValue}>
                      {fmtUVR( plan.totalIntereses )}
                      {' '}
                      UVR
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Total pagado</span>
                    <span className={styles.summaryValue}>
                      {fmtUVR( plan.totalPagado )}
                      {' '}
                      UVR
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Fecha última cuota</span>
                    <span className={styles.summaryValue}>
                      {fmtFechaCorta( ultimaFila.fecha )}
                    </span>
                  </div>
                </>
              )
            : (
                <p className={styles.summaryPlaceholder}>
                  Complete los campos para ver el resumen del crédito.
                </p>
              )}
        </aside>
      </form>
    </div>
  );
}

function StatusRegion( {
  isPending,
  resultState,
  serverError,
}: {
  isPending  : boolean;
  resultState: 'idle' | 'success' | 'error';
  serverError: string | undefined;
} ): ReactNode {
  if ( !isPending && resultState === 'idle' ) {
    return null;
  }

  return (
    <div
      className={styles.statusRegion}
      aria-live="polite"
    >
      {isPending
        ? (
            <div className={styles.busyRow}>
              <Icon
                name="progress_activity"
                className={styles.spinner}
                size={20}
              />
              <span>Generando archivo Excel…</span>
            </div>
          )
        : null}

      {!isPending && resultState === 'success'
        ? (
            <div className={`${ styles.resultBlock } ${ styles.successBlock }`}>
              <Icon
                name="check_circle"
                size={20}
              />
              <span>Excel generado y descargado con éxito.</span>
            </div>
          )
        : null}

      {!isPending && resultState === 'error'
        ? (
            <div className={`${ styles.resultBlock } ${ styles.errorBlock }`}>
              <Icon
                name="error"
                size={20}
              />
              <span>
                {serverError ?? 'Revise los campos marcados antes de continuar.'}
              </span>
            </div>
          )
        : null}
    </div>
  );
}
