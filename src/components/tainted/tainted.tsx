import React from 'react';

import styles from './tainted.module.scss';

export interface taintedProps {
  prop?: string;
}

export function tainted({prop = 'default value'}: taintedProps) {
  return <div className={styles.tainted}>tainted {prop}</div>;
}
