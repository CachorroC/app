import styles from 'components/Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { Loader } from '../Loader';

export function ActuacionLoader() {
      return (
        <td>
          <h5 className={` ${ styles.actuacion } ${ typography.titleSmall }`}>
        Cargando
          </h5>
          <span className="material-symbols-outlined">update</span>
          <Loader />
        </td>
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
