import styles from 'components/Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';
import { outActuacion } from '#@/lib/types/actuaciones';
import OutputDateHelper from '#@/lib/project/output-date-helper';
import { NewNotaComponent } from '../Modal';

export function ActuacionComponent(
  {
    incomingActuacion,
  }: {
    incomingActuacion: outActuacion;
  }
) {
      const {
        actuacion, anotacion, fechaActuacion, consActuacion,
      } = incomingActuacion;

      return (
        <div className={ styles.actuacionContainer }>
          <div className={ layout.segmentRow } style={{
            justifyContent: 'space-between'
          }}>
            <sub className={typography.labelMedium}>{consActuacion}</sub>
            <OutputDateHelper incomingDate={ fechaActuacion } className={
              typography.labelSmall
            }
            />
          </div>
          <div className={ layout.segmentRow }>
            <h4 className={typography.titleSmall}>Actuación:</h4>
            <h5 className={ typography.titleMedium }>{ actuacion }</h5>
          </div>
          { anotacion && <p className={ typography.bodyMedium }>{ anotacion }</p> }
          <div className={ styles.action }>
            <NewNotaComponent />
          </div>
        </div>
      );
}
