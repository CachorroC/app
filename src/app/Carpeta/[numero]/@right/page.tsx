'use client';

import styles from '#@/app/Carpetas/@right/Nueva/styles.module.css';
import { segmentColumn } from '#@/components/Buttons/buttons.module.css';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { fixMoney } from '#@/lib/project/helper';
import { MonCarpeta, NuevaCarpeta } from '#@/lib/types/carpetas';
import { useFormContext, useWatch } from 'react-hook-form';

export default function Page() {
  const {
    getValues 
  } = useFormContext<NuevaCarpeta>();

  const carpeta = useWatch<MonCarpeta>();

  return (
    <section className={segmentColumn}>
      <div className={styles.divider}></div>
      <div className={styles.divider}></div>
      <div className={styles.divider}></div>
      <pre>
        {fixMoney(
          {
            valor: carpeta.demanda.capitalAdeudado,
          } 
        )}
      </pre>
      <div className={styles.divider}></div>
      <pre>{OutputDateHelper(
        carpeta.demanda.entregaGarantiasAbogado 
      )}</pre>
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
              carpeta, null, 2 
            ) 
          );
        }}
      ></button>
      <div className={styles.divider}></div>
    </section>
  );
}
