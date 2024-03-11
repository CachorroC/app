
// !prints the output of the datehelper
export default function OutputDateHelper(
  {
    incomingDate, className
  }:{incomingDate: string | Date | null | undefined; className: string},
) {
      if ( !incomingDate || incomingDate === null || incomingDate === undefined ) {
        return 'sin especificar';
      }

      let daterBuilder;

      if ( typeof incomingDate === 'string' ) {
        daterBuilder = new Date(
          incomingDate
        );
      } else {
        daterBuilder = incomingDate;
      }

      const formatedValue = daterBuilder.toLocaleString(
        'es-CO', {
          timeZone: 'UTC',
          year    : 'numeric',
          weekday : 'short',
          month   : 'long',
          day     : 'numeric',
        }
      );
      return (
        <strong className={className}>{formatedValue}</strong>
      );
}
