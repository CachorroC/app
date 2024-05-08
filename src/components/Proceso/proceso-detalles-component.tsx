import { fetchDetalleProceso } from '#@/lib/project/utils/Procesos';
import Link from 'next/link';
import styles from '../Card/elevated.module.css';
import { CopyButton } from '../Buttons/copy-buttons';

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

      const {
        llaveProceso, idConexion, idRegProceso, contenidoRadicacion, fechaProceso, tipoProceso, claseProceso, ponente, recurso, subclaseProceso
      } = fetchDetails;
      return (
        <>
          <td>{ idConexion }</td>
          <td>{idRegProceso}</td>
          <td>{ contenidoRadicacion }</td>
          <td>{new Date(
            fechaProceso
          )
                .toLocaleDateString(
                  'es-co', {
                    weekday: 'long',
                    year   : 'numeric',
                    month  : 'long',
                    day    : 'numeric',
                  }
                )}</td>
          <td>{ tipoProceso }</td>
          <td><Link href={`/RamaJudicial/Expediente/${ llaveProceso }`}><CopyButton copyTxt={ llaveProceso } name={ `expediente numero ${ llaveProceso }` }/></Link></td>
          <td>{ claseProceso }</td>
          <td>{ ponente }</td>
          <td>{recurso}</td>
          <td>{subclaseProceso}</td>
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

      const {
        contenidoRadicacion, despacho, fechaProceso, tipoProceso, claseProceso, subclaseProceso
      } = fetchDetails;
      return (
        <div className={styles.container}>
          <h1>{ contenidoRadicacion }</h1>
          <h2>{ despacho }</h2>
          <h3>{new Date(
            fechaProceso
          )
                .toLocaleDateString(
                  'es-co', {
                    weekday: 'long',
                    year   : 'numeric',
                    month  : 'long',
                    day    : 'numeric',
                  }
                )}</h3>
          <h4>{ tipoProceso }</h4>
          <h5>{contenidoRadicacion}</h5>
          <h6>{ claseProceso }</h6>
          <sub>{subclaseProceso}</sub>
        </div>
      );
}
