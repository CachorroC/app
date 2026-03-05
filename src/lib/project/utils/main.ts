export const ramaJudicialBaseURL =
  'https://consultaprocesos.ramajudicial.gov.co:448/api/v2/';

export const capitalize = (str: string) => {
  return str?.replace(/\b\w/g, (substr) => {
    return substr.toUpperCase();
  });
};

export const consultaProcesosPorRazonSocial = (nombre: string) => {
  return new URL(
    `Procesos/Consulta/NombreRazonSocial?nombre=${nombre}&tipoPersona=nat&SoloActivos=false&codificacionDespacho=&pagina=1`,
    ramaJudicialBaseURL,
  );
};

export const consultaProcesoDetalleURL = (idProceso: string) => {
  return new URL(`Proceso/Detalle/${idProceso}`, ramaJudicialBaseURL);
};

export const consultaProcesoDocumentosURL = (idProceso: string) => {
  return new URL(`Proceso/Detalle/${idProceso}`, ramaJudicialBaseURL);
};

export const ramaJudicialProcesosPorNumeroRad = (llaveProceso: string) => {
  return new URL(
    `Procesos/Consulta/NumeroRadicacion?numero=${llaveProceso}&SoloActivos=false&pagina=1`,
    ramaJudicialBaseURL,
  );
};

export const ramaJudicialDescargadeDocsProceso = (idProceso: string) => {
  return new URL(`Descarga/DOCX/Proceso/${idProceso}`, ramaJudicialBaseURL);
};

export const ramaJudicialDescargadeCSVProceso = (idProceso: string) => {
  return new URL(`Descarga/CSV/Detalle/${idProceso}`, ramaJudicialBaseURL);
};
