import { Loader } from '#@/components/Loader';
import { ProcesosCardSkeleton } from '#@/components/Proceso/skeleton';
import styles from '#@/styles/layout.module.css';
import typography from '#@/styles/fonts/typography.module.css';

export default function Loading() {
      return (

        <>
          <div className={ styles.top }>
            <pre>cargando</pre>
          </div>
          <div className={ styles.leftGrid }>
            <table>
              <thead>
                <tr>
                  <th>cargando</th>
                  <th>cargando</th>
                  <th>cargando</th>
                  <th>cargando</th>
                  <th>Actuaciones</th>
                  <th>Revisado</th>
                  <th>expediente</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                </tr>
                <tr>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                </tr>
                <tr>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                </tr>
                <tr>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                </tr>
                <tr>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                </tr>
                <tr>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                </tr>
                <tr>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                </tr>
                <tr>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                </tr>
                <tr>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                </tr>
                <tr>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                  <td><Loader/></td>
                </tr>


              </tbody>
            </table>
          </div><div className={ styles.right }>
            <h4 className={typography.titleLarge}>Cargando</h4>
            <section className={styles.sectionColumn}>
              <Loader />
              <Loader />
              <Loader />
              <ProcesosCardSkeleton />
            </section>
          </div>
        </>
      );
}
