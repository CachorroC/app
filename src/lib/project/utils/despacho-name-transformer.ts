export function tipoGenerator (
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

export function idGenerator (
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
    paddedid: idPadded
  };

}

export function extrapolateTipoToCorrectType (
  tipo: string
) {
  let outputTipo = tipo,
    completeValue = tipo;

  const matchedNumbers = tipo.match(
    /(\d+)/im
  );

  const idNotPadded = matchedNumbers
    ? matchedNumbers[ 1 ]
    : '';

  const idPadded = idNotPadded.padStart(
    3, '000'
  );

  const hasEjecucion = /EJE|E/gim.test(
    tipo
  );

  const isPequeñasCausas = /PCCM|PCYCM|Peque/gim.test(
    tipo
  );

  const isPromiscuoMunicipal = /PM|PROM|P M/gim.test(
    tipo
  );

  const isCivilMunicipal = /(CM|municipal|C M)/g.test(
    tipo
  );

  const isCivilCircuito = /(CC|CIRCUITO|CTO)/gim.test(
    tipo
  );

  if ( hasEjecucion ) {
    if ( isCivilMunicipal ) {
      outputTipo = 'CIVIL MUNICIPAL DE EJECUCIÓN DE SENTENCIAS';
      completeValue = `JUZGADO ${ idPadded } CIVIL MUNICIPAL DE EJECUCIÓN DE SENTENCIAS`;
    } else if ( isCivilCircuito ) {
      outputTipo = 'CIVIL DEL CIRCUITO DE EJECUCIÓN DE SENTENCIAS';
      completeValue = `JUZGADO ${ idPadded } CIVIL DEL CIRCUITO DE EJECUCIÓN DE SENTENCIAS`;
    } else if ( isPequeñasCausas ) {
      outputTipo = 'DE PEQUEÑAS CAUSAS Y COMPETENCIA MÚLTIPLE';
      completeValue = `JUZGADO ${ idPadded } DE PEQUEÑAS CAUSAS Y COMPETENCIA MÚLTIPLE`;
    } else if ( isPromiscuoMunicipal ) {
      outputTipo = 'PROMISCUO MUNICIPAL';
      completeValue = `JUZGADO ${ idPadded } PROMISCUO MUNICIPAL`;
    }
  } else {
    if ( isCivilMunicipal ) {
      outputTipo = 'CIVIL MUNICIPAL';
      completeValue = `JUZGADO ${ idPadded } CIVIL MUNICIPAL`;
    } else if ( isCivilCircuito ) {
      outputTipo = 'CIVIL DEL CIRCUITO';
      completeValue = `JUZGADO ${ idPadded } CIVIL DEL CIRCUITO`;
    } else if ( isPequeñasCausas ) {
      outputTipo = 'DE PEQUEÑAS CAUSAS Y COMPETENCIA MÚLTIPLE';
      completeValue = `JUZGADO ${ idPadded } DE PEQUEÑAS CAUSAS Y COMPETENCIA MÚLTIPLE`;
    } else if ( isPromiscuoMunicipal ) {
      outputTipo = 'PROMISCUO MUNICIPAL';
      completeValue = `JUZGADO ${ idPadded } PROMISCUO MUNICIPAL`;
    }
  }

  return {
    id           : idPadded,
    tipo         : outputTipo,
    completeValue: completeValue,
  };
}
