import Link from 'next/link';
import { CopyButton } from '../Buttons/copy-buttons';
import checkboxStyles from '../Form/checkbox/styles.module.css';
import { DetalleProceso } from '#@/lib/types/procesos';
import { consultaProcesoDetalleURL } from '#@/lib/project/utils/main';

export async function ProcesoTableDetalleComponent(
  {
    idProceso,
  }: {
  idProceso: number;
} 
) {
  const urlNameMaker = consultaProcesoDetalleURL(
    idProceso 
  );

  const fetchProc = await fetch(
    urlNameMaker 
  );

  if ( !fetchProc.ok ) {
    console.log(
      `proceso detalle failer with error: ${ fetchProc.statusText }` 
    );
    return null;
  }

  const fetchDetails = ( await fetchProc.json() ) as DetalleProceso;

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
      <td>{despacho}</td>
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
        {new Date(
          fechaConsulta 
        )
          .toLocaleDateString(
            'es-co', {
              weekday: 'long',
              year   : 'numeric',
              month  : 'long',
              day    : 'numeric',
            } 
          )}
      </td>
      <td>
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
      </td>
      <td>{idConexion}</td>
      <td>{idRegProceso}</td>
      <td>
        <Link href={`/RamaJudicial/Expediente/${ llaveProceso }`}>
          <span>{llaveProceso}</span>
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
      <td>{ubicacion}</td>
      <td>
        {new Date(
          ultimaActualizacion 
        )
          .toLocaleDateString(
            'es-co', {
              weekday: 'long',
              year   : 'numeric',
              month  : 'long',
              day    : 'numeric',
            } 
          )}
      </td>
    </>
  );
}
