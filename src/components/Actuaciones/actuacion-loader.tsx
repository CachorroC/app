import styles from 'components/Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { Loader } from '../Loader';
import layout from '#@/styles/layout.module.css';

export function ActuacionLoader() {
      return (
        <div className={styles.actuacionContainer}>
          <div className={ layout.segmentRow }>
            <h4 className={typography.titleMedium}>Actuación:</h4>
            <h5 className={ typography.bodyMedium }>Cargando</h5>
          </div>
          <span className="material-symbols-outlined">update</span>
          <Loader />
        </div>
      );
}

export function ActuacionesLoader() {
      return (
        <>
          <ActuacionLoader key={'1'}/>
          <ActuacionLoader key={'2'}/>
          <ActuacionLoader key={'3'}/>
          <ActuacionLoader key={'4'}/>
          <ActuacionLoader key={'5'}/>
          <ActuacionLoader key={'6'}/>
          <ActuacionLoader key={'7'}/>
          <ActuacionLoader key={'8'}/>
          <ActuacionLoader key={'9'}/>
          <ActuacionLoader key={'0'}/>
        </>
      );
}
