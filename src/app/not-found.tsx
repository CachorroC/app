import { headers } from 'next/headers';

export default async function NotFound() {
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

      const arrMap = Array.from(
        mapper 
      );

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
        </div>
      );
}
