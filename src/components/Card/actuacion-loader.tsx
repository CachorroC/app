import styles from 'components/Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { Loader } from '../Loader';

export default function ActuacionLoader() {
      return (

        <>
          <h5
            className={ ` ${ styles.actuacion } ${ typography.titleSmall }` }
          >
         Cargando
          </h5>
          <span className='material-symbols-outlined'>update</span>
          <Loader/>
        </>
      );
}
