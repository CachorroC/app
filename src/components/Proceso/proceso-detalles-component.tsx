import { fetchDetalleProceso } from '#@/lib/project/utils/Procesos';
import styles from '../Card/outlined.module.css';
import { JuzgadoComponent } from './juzgado-component';

export async function ProcesoTableDetalleComponent(
  {
    idProceso
  }: {idProceso: number}
) {
      const fetchDetails = await fetchDetalleProceso(
        {
          idProceso
        }
      );

      if ( !fetchDetails ) {
        return null;
      }

      return (
        <>
          <td>{ fetchDetails.contenidoRadicacion }</td>
          <td><JuzgadoComponent juzgado={ fetchDetails.juzgado} /></td>
          <td>{new Date(
            fetchDetails.fechaProceso
          )
                .toLocaleDateString(
                  'es-co', {
                    weekday: 'long',
                    year   : 'numeric',
                    month  : 'long',
                    day    : 'numeric',
                  }
                )}</td>
          <td>{ fetchDetails.tipoProceso }</td>
          <td>{fetchDetails.contenidoRadicacion}</td>
          <td>{ fetchDetails.claseProceso }</td>
          <td>{fetchDetails.subclaseProceso}</td>
        </>
      );
}


export async function ProcesoDetalleComponent(
  {
    idProceso
  }: {idProceso: number}
) {
      const fetchDetails = await fetchDetalleProceso(
        {
          idProceso
        }
      );

      if ( !fetchDetails ) {
        return null;
      }

      return (
        <div className={styles.container}>
          <h1>{ fetchDetails.contenidoRadicacion }</h1>
          <h2>{ fetchDetails.despacho }</h2>
          <h3>{new Date(
            fetchDetails.fechaProceso
          )
                .toLocaleDateString(
                  'es-co', {
                    weekday: 'long',
                    year   : 'numeric',
                    month  : 'long',
                    day    : 'numeric',
                  }
                )}</h3>
          <h4>{ fetchDetails.tipoProceso }</h4>
          <h5>{fetchDetails.contenidoRadicacion}</h5>
          <h6>{ fetchDetails.claseProceso }</h6>
          <sub>{fetchDetails.subclaseProceso}</sub>
        </div>
      );
}
