'use client';
import { useCarpetaSort } from '#@/app/context/carpetas-sort-context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
      let linker;

      const mapper = new Set<string>();

      const pathname = usePathname();

      const [
        , firstRoute,
        secondRoute 
      ] = pathname.split(
        '/' 
      );

      const arrMap = Array.from(
        mapper 
      );

      const carpetas = useCarpetaSort();

      if ( firstRoute === 'Carpeta' ) {
        console.log(
          `carpeta numero ${ Number(
            secondRoute 
          ) }` 
        );

        const carpeta = carpetas.find(
          (
            c 
          ) => {
                    return c.numero === Number(
                      secondRoute 
                    );
          } 
        );

        if ( carpeta ) {
          linker = <Link href={'/'}></Link>;
        }
      }

      return (
        <div>
          <h2>Not Found</h2>
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
