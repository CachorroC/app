export function InputDateHelper( incomingDate?: string | Date | null | undefined, ): string {
  if ( !incomingDate || incomingDate === null || incomingDate === undefined ) {
    return '';
  }

  let daterBuilder;

  if ( typeof incomingDate === 'string' ) {
    daterBuilder = new Date( incomingDate );
  } else {
    daterBuilder = incomingDate;
  }

  const yearBuilder = daterBuilder.getFullYear();

  const inputMonth = String( daterBuilder.getMonth() + 1 )
    .padStart(
      2, '0' 
    );

  const inputDate = String( daterBuilder.getDate() + 1 )
    .padStart(
      2, '0' 
    );

  return `${ yearBuilder }-${ inputMonth }-${ inputDate }`;
}
