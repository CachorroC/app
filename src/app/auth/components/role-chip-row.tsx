'use client';

import styles from './role-chip-row.module.css';

export type RolSeleccionable = 'ABOGADO' | 'ASISTENTE' | 'LECTOR';

const ROLES: { valor: RolSeleccionable; label: string; icon: string }[] = [
  {
    valor: 'ABOGADO',
    label: 'Abogado',
    icon : 'gavel'
  },
  {
    valor: 'ASISTENTE',
    label: 'Asistente',
    icon : 'support_agent'
  },
  {
    valor: 'LECTOR',
    label: 'Lector',
    icon : 'visibility'
  },
];

const ROLE_HINTS: Record<RolSeleccionable, string> = {
  ABOGADO  : 'Gestiona carpetas, actuaciones y cobros. Requiere tarjeta profesional.',
  ASISTENTE: 'Apoyo operativo y documental sobre las carpetas asignadas.',
  LECTOR   : 'Solo consulta. No puede editar carpetas ni actuaciones.',
};

type RoleChipRowProps = {
  value    : RolSeleccionable;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onChange : ( value: RolSeleccionable ) => void;
  disabled?: boolean;
};

export const RoleChipRow = ( {
  value, onChange, disabled
}: RoleChipRowProps ) => {
  return (
    <div>
      <div className={styles.label}>Rol en la firma</div>
      <div className={styles.row} role="radiogroup" aria-label="Rol en la firma">
        {ROLES.map( ( r ) => {
          return (
            <button
              key={r.valor}
              type="button"
              role="radio"
              aria-checked={value === r.valor}
              disabled={disabled}
              onClick={() => {
                onChange( r.valor );
              }}
              className={`${ styles.chip } ${ value === r.valor
                ? styles.chipSelected
                : '' }`}
            >
              <span className={`material-symbols-rounded ${ styles.chipIcon }`} aria-hidden="true">{r.icon}</span>
              {r.label}
            </button>
          );
        } )}
      </div>
      <div className={styles.hint}>{ROLE_HINTS[ value ]}</div>
    </div>
  );
};
