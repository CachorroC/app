'use client';

import { FilterChip } from '#@/components/Carpetas/client/filter-chip';
import { CategoryColor } from '#@/components/Carpetas/client/carpeta-meta';
import styles from './facet-group.module.css';

export function FacetGroup( {
  label,
  options,
}: {
  label  : string;
  options: {
    value   : string;
    label   : string;
    selected: boolean;
    color?  : CategoryColor;
    onClick : () => void;
  }[];
} ) {
  if ( options.length === 0 ) {
    return null;
  }

  return (
    <div className={styles.group}>
      <span className={styles.label}>{label}</span>
      <div className={styles.chips}>
        {options.map( ( option ) => {
          return (
            <FilterChip
              key={option.value}
              label={option.label}
              selected={option.selected}
              color={option.color}
              onClick={option.onClick}
            />
          );
        } )}
      </div>
    </div>
  );
}
