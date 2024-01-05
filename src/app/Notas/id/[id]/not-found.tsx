import { getNotaById } from '#@/lib/project/utils/Notas/notas';
import { headers } from 'next/headers';
import Link from 'next/link';

export default async function NotFound() {
      let linker;

      const mapper = new Set<string>();

      const headersList = headers();

      for ( const [ key, value ] of headersList ) {
        mapper.add(
          `${ key } : ${ value }` 
        );
      }

      const domain = headersList.get(
        'next-url' 
      ) ?? '';

      const [
        , firstRoute,
        secondRoute 
      ] = domain.split(
        '/' 
      );

      const arrMap = Array.from(
        mapper 
      );

      if ( firstRoute === 'Notas' ) {
        const carpeta = await getNotaById(
          Number(
            secondRoute 
          ) 
        );

        if ( carpeta ) {
          linker = <Link href={'/'}></Link>;
        }
      }

      return (
        <div>
          <h2>Not Found: {domain}</h2>
          {arrMap.map(
            (
              mp, i 
            ) => {
                      return <p key={i}>{mp}</p>;
            } 
          )}
          <p>Could not find requested resource</p>
          {linker}
        </div>
      );
}
