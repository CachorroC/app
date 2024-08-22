import { fetchDetalleProceso } from '#@/lib/project/utils/Procesos';
import Link from 'next/link';
import styles from '../Card/elevated.module.css';
import { CopyButton } from '../Buttons/copy-buttons';
import checkboxStyles from '../Form/checkbox/styles.module.css';

export async function ProcesoTableDetalleComponent(
  {
    idProceso,
  }: {
  idProceso: number;
}
) {
  const fetchDetails = await fetchDetalleProceso(
    {
      idProceso,
    }
  );

  if ( !fetchDetails ) {
    return null;
  }

  const {
    llaveProceso,
    idConexion,
    idRegProceso,
    contenidoRadicacion,
    fechaProceso,
    fechaConsulta,
    tipoProceso,
    esPrivado,
    ubicacion,
    despacho,
    claseProceso,
    ultimaActualizacion,
    ponente,
    recurso,
    subclaseProceso,
  } = fetchDetails;
  return (
    <>
      <td>{claseProceso}</td>
      <td>{contenidoRadicacion}</td>
      <td>{ despacho }</td>
      <td>
        <label className={checkboxStyles.switchBox}>
          <input
            className={checkboxStyles.inputElement}
            defaultChecked={esPrivado}
            type="checkbox"
          />
          <span className={checkboxStyles.slider}></span>
        </label>
      </td>
      <td>
        {
          new Date(
            fechaConsulta
          )
            .toLocaleDateString(
              'es-co', {
                weekday: 'long',
                year   : 'numeric',
                month  : 'long',
                day    : 'numeric',
              }
            )
        }
      </td>
      <td>
        {
          new Date(
            fechaProceso
          )
            .toLocaleDateString(
              'es-co', {
                weekday: 'long',
                year   : 'numeric',
                month  : 'long',
                day    : 'numeric',
              }
            )
        }
      </td>
      <td>{idConexion}</td>
      <td>{ idRegProceso }</td>
      <td>
        <Link href={ `/RamaJudicial/Expediente/${ llaveProceso }` }>
          <span>{ llaveProceso }</span>
        </Link>
        <CopyButton
          copyTxt={llaveProceso}
          name={`expediente numero ${ llaveProceso }`}
        />

      </td>
      <td>{ponente}</td>
      <td>{recurso}</td>
      <td>{subclaseProceso}</td>
      <td>{tipoProceso}</td>
      <td>{ ubicacion }</td>
      <td>
        {
          new Date(
            ultimaActualizacion
          )
            .toLocaleDateString(
              'es-co', {
                weekday: 'long',
                year   : 'numeric',
                month  : 'long',
                day    : 'numeric',
              }
            )
        }
      </td>
    </>
  );
}

export async function ProcesoDetalleComponent(
  {
    idProceso,
  }: {
  idProceso: number;
}
) {
  const fetchDetails = await fetchDetalleProceso(
    {
      idProceso,
    }
  );

  if ( !fetchDetails ) {
    return null;
  }

  const {
    contenidoRadicacion,
    despacho,
    fechaProceso,
    tipoProceso,
    claseProceso,
    subclaseProceso,
  } = fetchDetails;
  return (
    <div className={styles.container}>
      <h1>{contenidoRadicacion}</h1>
      <h2>{despacho}</h2>
      <h3>
        {new Date(
          fechaProceso
        )
          .toLocaleDateString(
            'es-co', {
              weekday: 'long',
              year   : 'numeric',
              month  : 'long',
              day    : 'numeric',
            }
          )}
      </h3>
      <h4>{tipoProceso}</h4>
      <h5>{contenidoRadicacion}</h5>
      <h6>{claseProceso}</h6>
      <sub>{subclaseProceso}</sub>
    </div>
  );
}
