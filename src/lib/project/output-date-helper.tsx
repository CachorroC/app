// !prints the output of the datehelper
export default function OutputDateHelper( {
  incomingDate,
}: {
  incomingDate: string | Date | null | undefined;
} ) {
  if ( !incomingDate || incomingDate === null || incomingDate === undefined ) {
    return 'sin especificar';
  }

  let daterBuilder;

  if ( typeof incomingDate === 'string' ) {
    daterBuilder = new Date( incomingDate );
  } else {
    daterBuilder = incomingDate;
  }

  return daterBuilder.toLocaleString(
    'es-CO', {
      year   : 'numeric',
      weekday: 'long',
      month  : 'long',
      day    : 'numeric',
    } 
  );
}
