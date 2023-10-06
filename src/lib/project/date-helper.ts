export function InputDateHelper (
  incomingDate: string | Date
) {
  let daterBuilder;

  if ( typeof incomingDate === 'string' ) {
    daterBuilder = new Date(
      incomingDate
    );
  } else {
    daterBuilder = incomingDate;
  }

  return daterBuilder.toISOString()
    .slice(
      0, 10
    );
}

// !prints the output of the datehelper
export function OutputDateHelper (
  incomingDate: string | Date
) {

  let daterBuilder;

  if ( typeof incomingDate === 'string' ) {
    daterBuilder = new Date(
      incomingDate
    );
  } else {
    daterBuilder = incomingDate;
  }

  return daterBuilder.toLocaleString(
    'es-CO', {
      year   : 'numeric',
      weekday: 'short',
      month  : 'long',
      day    : 'numeric',
    }
  );
}