// ============================================================
// Asesor Jurídico — formatting & domain helpers
// Colombian Spanish locale, Material You category/status mapping.
// ============================================================
import { Category,
  TipoProceso,
  type CaseStatus,
  type Carpeta,
  type Deudor, } from './types';

const COP = new Intl.NumberFormat( 'es-CO' );

/** "$ 12.450.000" — Colombian thousands grouping. 0 / null → "$ 0". */
export function fmtCOP( n?: number | null ): string {
  if ( !n ) {
    return '$ 0';
  }

  return `$ ${ COP.format( Math.round( n ) ) }`;
}

/** Compact money for KPI tiles: "$ 1,2 MM" / "$ 423 M". */
export function fmtMoneyShort( n: number ): string {
  if ( n >= 1e9 ) {
    return `$ ${ ( n / 1e9 ).toFixed( 1 )
      .replace(
        '.', ',' 
      ) } MM`;
  }

  if ( n >= 1e6 ) {
    return `$ ${ Math.round( n / 1e6 ) } M`;
  }

  return fmtCOP( n );
}

/** "09 jun 2026". Empty / null → "—". */
export function fmtDate( iso?: string | null ): string {
  if ( !iso ) {
    return '—';
  }

  return new Date( `${ iso }T00:00:00` )
    .toLocaleDateString(
      'es-CO', {
        day  : '2-digit',
        month: 'short',
        year : 'numeric',
      } 
    );
}

export function isOverdue(
  iso?: string | null, today = new Date() 
): boolean {
  if ( !iso ) {
    return false;
  }

  return new Date( `${ iso }T00:00:00` ) < today;
}

export function deudorNombre( d: Deudor ): string {
  return [
    d.primerNombre,
    d.segundoNombre,
    d.primerApellido,
    d.segundoApellido
  ]
    .filter( Boolean )
    .join( ' ' );
}

export function deudorInitials( d: Deudor ): string {
  const parts = [
    d.primerNombre,
    d.primerApellido
  ].filter( Boolean ) as string[];

  return (
    parts
      .map( ( p ) => {
        return p[ 0 ];
      } )
      .join( '' ) || '?'
  )
    .toUpperCase()
    .slice(
      0, 2 
    );
}

// ---- Category metadata (label, accent CSS var, icon ligature) ----
export interface CategoryMeta {
  label   : string;
  colorVar: string;
  icon    : string;
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  [ Category.Bancolombia ]: {
    label   : 'Bancolombia',
    colorVar: 'var(--cat-bancolombia)',
    icon    : 'account_balance',
  },
  [ Category.Reintegra ]: {
    label   : 'Reintegra',
    colorVar: 'var(--cat-reintegra)',
    icon    : 'sync_alt',
  },
  [ Category.Insolvencia ]: {
    label   : 'Insolvencia',
    colorVar: 'var(--cat-insolvencia)',
    icon    : 'balance',
  },
  [ Category.LiosJuridicos ]: {
    label   : 'Líos Jurídicos',
    colorVar: 'var(--cat-lios-juridicos)',
    icon    : 'gavel',
  },
  [ Category.Terminados ]: {
    label   : 'Terminados',
    colorVar: 'var(--cat-terminados)',
    icon    : 'task_alt',
  },
  [ Category.SinTercero ]: {
    label   : 'Sin tercero',
    colorVar: 'var(--cat-sin-tercero)',
    icon    : 'help',
  },
  [ Category.SinEspecificar ]: {
    label   : 'Sin especificar',
    colorVar: 'var(--cat-sin-especificar)',
    icon    : 'folder',
  },
};

// ---- Process-type labels (TipoProceso enum) ----
export const TIPO_PROCESO_LABEL: Record<TipoProceso, string> = {
  [ TipoProceso.HIPOTECARIO ]: 'Hipotecario',
  [ TipoProceso.PRENDARIO ]  : 'Prendario',
  [ TipoProceso.SINGULAR ]   : 'Singular',
  [ TipoProceso.ACUMULADO ]  : 'Acumulado',
};

// ---- Status metadata (label + CSS container/text vars) ----
export interface StatusMeta {
  label: string;
  bgVar: string;
  fgVar: string;
}

export const STATUS_META: Record<CaseStatus, StatusMeta> = {
  active: {
    label: 'En proceso',
    bgVar: 'var(--status-active-container)',
    fgVar: 'var(--blue-20)',
  },
  review: {
    label: 'Por revisar',
    bgVar: 'var(--status-review-container)',
    fgVar: '#5C3D00',
  },
  done: {
    label: 'Terminado',
    bgVar: 'var(--status-done-container)',
    fgVar: '#0B4D2E',
  },
  overdue: {
    label: 'Vencido',
    bgVar: 'var(--status-overdue-container)',
    fgVar: 'var(--on-error-container)',
  },
};

/** Derive a lifecycle status from a carpeta's flags. */
export function deriveStatus( c: Pick<Carpeta, 'terminado' | 'vencido' | 'revisado'>, ): CaseStatus {
  if ( c.terminado ) {
    return 'done';
  }

  if ( c.vencido ) {
    return 'overdue';
  }

  if ( !c.revisado ) {
    return 'review';
  }

  return 'active';
}
