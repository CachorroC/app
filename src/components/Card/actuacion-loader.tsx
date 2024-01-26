import styles from 'components/Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.css';

export default function ActuacionLoader() {
      return (
        <>
          <td>
            <h5 className={ ` ${ styles.actuacion } ${ typography.titleSmall }` }>
              Sin registro
            </h5>
            <sub className={ typography.labelSmall }>0 de 0</sub>
          </td>
          <td>
            <sub className={ typography.headlineMedium }>por favor revise que el numero de expediente esté bien o si la informacion la brinda el juzgado por otro canal</sub>

          </td>
        </>

      );
}
