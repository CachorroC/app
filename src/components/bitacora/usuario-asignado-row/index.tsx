'use client';

import { RolAsignacionVisible, UsuarioAsignadoDTO } from '#@/lib/bitacora/tipos';
import styles from './usuario-asignado-row.module.css';

const ROLES: { valor: RolAsignacionVisible; label: string }[] = [
  {
    valor: 'RESPONSABLE',
    label: 'Responsable'
  },
  {
    valor: 'COLABORADOR',
    label: 'Colaborador'
  },
  {
    valor: 'OBSERVADOR',
    label: 'Observador'
  },
];

function iniciales( nombre: string ): string {
  const partes = nombre.trim()
    .split( /\s+/ );

  return partes.slice(
    0, 2
  )
    .map( ( p ) => {
      return p[ 0 ]?.toUpperCase() ?? '';
    } )
    .join( '' );
}

export type UsuarioAsignadoRowProps = {
  usuario     : UsuarioAsignadoDTO;
  disabled?   : boolean;
  // eslint-disable-next-line no-unused-vars -- nombre documental del parámetro en un tipo función
  onCambiarRol: ( rol: RolAsignacionVisible ) => void;
  onQuitar    : () => void;
};

export const UsuarioAsignadoRow = ( {
  usuario, disabled = false, onCambiarRol, onQuitar
}: UsuarioAsignadoRowProps ) => {
  return (
    <div className={styles.fila}>
      <span className={styles.avatar} aria-hidden="true">{iniciales( usuario.nombre )}</span>
      <span className={styles.nombre}>{usuario.nombre}</span>
      <select
        className={styles.rol}
        value={usuario.rol}
        disabled={disabled}
        aria-label={`Rol de ${ usuario.nombre }`}
        onChange={( e ) => {
          onCambiarRol( e.target.value as RolAsignacionVisible );
        }}
      >
        {ROLES.map( ( r ) => {
          return <option key={r.valor} value={r.valor}>{r.label}</option>;
        } )}
      </select>
      {!disabled && (
        <button
          type="button"
          className={styles.quitar}
          aria-label={`Quitar a ${ usuario.nombre }`}
          onClick={onQuitar}
        >
          <span className="material-symbols-rounded" aria-hidden="true">close</span>
        </button>
      )}
    </div>
  );
};
