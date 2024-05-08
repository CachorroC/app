
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';
import { outActuacion } from '#@/lib/types/actuaciones';
import OutputDateHelper from '#@/lib/project/output-date-helper';
import { NewNotaComponent } from '../Modal';
import styles from '../Card/elevated.module.css';

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
        <div className={ styles.containerEnabled}>
          <div className={ layout.segmentRow } style={{
            justifyContent: 'space-between'
          }}>
            <sub className={ typography.labelMedium }>{ consActuacion }</sub>
            <h5 className={ typography.titleMedium }>{ actuacion }</h5>

          </div>
          <div className={ layout.segmentRow }>
            <OutputDateHelper incomingDate={ fechaActuacion }
            />
            { anotacion && <p className={ typography.bodyMedium }>{ anotacion }</p> }
          </div>
          <div className={ layout.segmentRow }>
            <NewNotaComponent  id={ '' }  />
          </div>
        </div>
      );
}
