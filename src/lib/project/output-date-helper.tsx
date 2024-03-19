import typography from '#@/styles/fonts/typography.module.css';

// !prints the output of the datehelper
export default function OutputDateHelper(
  {
    incomingDate, className, name
  }:{incomingDate: string | Date | null | undefined; className: string; name?: string},
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
        <>

          { name &&( <p className={typography.titleSmall}>{ `${ name }: `}</p> ) }

          <strong className={ className } style={{
            textAlign: 'right'
          }}>{ formatedValue }</strong></>
      );
}
