import layout from '#@/styles/layout.module.css';
import styles from 'components/Card/card.module.css';
import button from '#@/components/Buttons/buttons.module.css';
import typography from '#@/styles/fonts/typography.module.css';

export default function ActuacionLoader() {
      return (
        <div className={layout.sectionRow}>
          <button
            className={button.buttonActuacion}
            type="button"
          >
            <span className={`material-symbols-outlined ${ button.icon }`}>
          cycle
            </span>
          </button>
          <h5 className={` ${ styles.actuacion } ${ typography.titleSmall }`}>
        cargando
          </h5>
          <div className={layout.sectionColumn}>
            <section className={layout.segmentRow}>
              <sub className={styles.sub}>0 de 0</sub>
              <sub className={styles.sub}>cargando el contenido</sub>
            </section>
          </div>
        </div>
      );
}
