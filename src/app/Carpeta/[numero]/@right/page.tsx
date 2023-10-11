'use client';

import styles from '#@/app/Carpetas/@right/Nueva/styles.module.css';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { NuevaCarpeta } from '#@/lib/types/carpetas';
import { useFormContext, useWatch } from 'react-hook-form';

export default function Page() {
  const {
    getValues
  } = useFormContext<NuevaCarpeta>();

  const nuevaCarpeta = useWatch();

  return (
    <>
      <div className={styles.divider}></div>
      <div className={styles.divider}></div>
      <div className={styles.divider}></div>
      <pre>
        {Number(
          nuevaCarpeta.demanda.capitalAdeudado ?? 0
        )
          .toLocaleString(
            'es-CO', {
              currency       : 'COP',
              style          : 'currency',
              currencyDisplay: 'name',
            }
          )}
      </pre>
      <div className={styles.divider}></div>
      <pre>
        {OutputDateHelper(
          nuevaCarpeta.demanda.entregaGarantiasAbogado
        )}
      </pre>
      <div className={styles.divider}></div>

      <pre>{JSON.stringify(
        getValues(), null, 2
      )}</pre>
      <div className={styles.divider}></div>
      <button
        type="button"
        onClick={() => {
          alert(
            JSON.stringify(
              nuevaCarpeta, null, 2
            )
          );
        }}
      ></button>
      <div className={styles.divider}></div>
    </>
  );
}
