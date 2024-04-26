
export function extrapolateTipoToCorrectType(
  tipo: string,
) {
      let outputTipo = tipo, completeValue = tipo ;

      const matchedNumbers = tipo.match(
        /(\d+)/mi
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
