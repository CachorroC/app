
export async function ProcesoDetalles(
  {
    idProceso
  }: {idProceso: number}
) {
      const fetchDetails = await fetch(
        `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Detalle/${ idProceso }`
      );

      if ( !fetchDetails.ok ) {
        return null;
      }

      const asAnObject = ( await fetchDetails.json() ) as ProcesoDetalle;

      return (
        <>
          <td>{asAnObject.tipoProceso}</td>
          <td>{ asAnObject.claseProceso }</td>
          <td>{asAnObject.subclaseProceso}</td>
        </>
      );
}
