import styles from 'components/Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { fixFechas } from '#@/lib/project/helper';
import layout from '#@/styles/layout.module.css';
import { outActuacion } from '#@/lib/types/actuaciones';

export function ActuacionComponent(
  {
    incomingActuacion,
  }: {
    incomingActuacion: outActuacion;
  } 
) {
      const {
        actuacion, anotacion, fechaActuacion 
      } = incomingActuacion;

      return (
        <div className={styles.containerFilledEnabled}>
          <div className={layout.segmentRow}>
            <h5 className={typography.titleSmall}>{actuacion}</h5>
            <p className={typography.labelSmall}>{fixFechas(
              fechaActuacion 
            )}</p>
          </div>
          {anotacion && <p className={typography.bodySmall}>{anotacion}</p>}
        </div>
      );
}
