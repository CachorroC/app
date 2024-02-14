import styles from 'components/Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';
import { Loader } from '../Loader';

export default function ActuacionLoader() {
      return (
        <div className={styles.containerFilledDisabled}>
          <div className={layout.segmentRow}>
            <h5 className={typography.titleSmall}>Cargando</h5>
            <span className="material-symbols-outlined">cached</span>
          </div>
          <Loader />
        </div>
      );
}
