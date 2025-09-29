export function tipoGenerator(
  tipoRaw: string 
): string {
  let output = tipoRaw;

  const hasEjecucion = /EJE|E/gim.test(
    tipoRaw 
  );

  const isPequeñasCausas = /PCCM|PCYCM|Peque/gim.test(
    tipoRaw 
  );

  const isPromiscuoMunicipal = /PM|PROM|P M/gim.test(
    tipoRaw 
  );

  const isCivilMunicipal = /(CM|municipal|C M)/g.test(
    tipoRaw 
  );

  const isCivilCircuito = /(CC|CIRCUITO|CTO)/gim.test(
    tipoRaw 
  );

  if ( hasEjecucion ) {
    if ( isCivilMunicipal ) {
      output = 'CIVIL MUNICIPAL DE EJECUCIÓN DE SENTENCIAS';
    } else if ( isCivilCircuito ) {
      output = 'CIVIL DEL CIRCUITO DE EJECUCIÓN DE SENTENCIAS';
    } else if ( isPequeñasCausas ) {
      output = 'DE PEQUEÑAS CAUSAS Y COMPETENCIA MÚLTIPLE';
    } else if ( isPromiscuoMunicipal ) {
      output = 'PROMISCUO MUNICIPAL';
    }
  } else {
    if ( isCivilMunicipal ) {
      output = 'CIVIL MUNICIPAL';
    } else if ( isCivilCircuito ) {
      output = 'CIVIL DEL CIRCUITO';
    } else if ( isPequeñasCausas ) {
      output = 'DE PEQUEÑAS CAUSAS Y COMPETENCIA MÚLTIPLE';
    } else if ( isPromiscuoMunicipal ) {
      output = 'PROMISCUO MUNICIPAL';
    }
  }

  return output;
}

export function idGenerator(
  idRaw: string 
) {
  const matchedNumbers = idRaw.match(
    /(\d+)/im 
  );

  const idNotPadded = matchedNumbers
    ? matchedNumbers[ 1 ]
    : '';

  const idPadded = idNotPadded.padStart(
    3, '000' 
  );

  return {
    id      : idNotPadded,
    paddedid: idPadded,
  };
}

export function extrapolateTipoToCorrectType(
  tipo: string 
): string {
  let output = tipo;

  const hasEjecucion = /EJE|E|EJ/gim.test(
    tipo 
  );

  const isPromiscuoCircuito = /PCTO/gim.test(
    tipo 
  );

  const isPequeñasCausas = /PCCM|PCYCM|Peque|causas/gim.test(
    tipo 
  );

  const isPromiscuoMunicipal = /PM|PROM|P M/gim.test(
    tipo 
  );

  const isCivilMunicipal = /(CM|municipal|C M)/g.test(
    tipo 
  );

  const isCivilCircuito = /(CCTO|CIRCUITO|CTO|C CTO|CC)/gim.test(
    tipo 
  );

  if ( hasEjecucion ) {
    if ( isCivilCircuito ) {
      output = 'CIVIL DEL CIRCUITO DE EJECUCIÓN DE SENTENCIAS';
    } else if ( isPequeñasCausas ) {
      output = 'DE PEQUEÑAS CAUSAS Y COMPETENCIA MÚLTIPLE';
    } else if ( isPromiscuoMunicipal ) {
      output = 'PROMISCUO MUNICIPAL';
    } else if ( isCivilMunicipal ) {
      output = 'CIVIL MUNICIPAL DE EJECUCIÓN DE SENTENCIAS';
    }
  } else {
    if ( isPromiscuoCircuito ) {
      output = 'PROMISCUO DEL CIRCUITO';
    } else if ( isCivilCircuito ) {
      output = 'CIVIL DEL CIRCUITO';
    } else if ( isPequeñasCausas ) {
      output = 'DE PEQUEÑAS CAUSAS Y COMPETENCIA MÚLTIPLE';
    } else if ( isPromiscuoMunicipal ) {
      output = 'PROMISCUO MUNICIPAL';
    } else if ( isCivilMunicipal ) {
      output = 'CIVIL MUNICIPAL';
    }
  }

  return output;
}
