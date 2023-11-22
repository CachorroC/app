
import { Fragment, Suspense } from 'react';
import { Loader } from '#@/components/Loader';
import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import { notFound } from 'next/navigation';
import { ConsultaActuacion } from '#@/lib/types/actuaciones';

//SECTION Generate segments for [numero]
/* export async function generateStaticParams () {
      const carpetas =( await fetch(
        'https://api.rsasesorjuridico.com/api/Carpetas', {
          headers: {
            'CF-Access-Client-Id'    : 'dac874230dcfcd71de02b41f5e78083c.access',
            'CF-Access-Client-Secret': 'cd9f43a4ea535037f9a1d03fc82e2477020438e462bb076d7926c53ebbadeaf8'
          }
        }
      )
            .then(
              res => {
                        return res.json();
              }
            )
      ) as Carpeta[];

      return carpetas.flatMap(
        (
          carpeta
        ) => {
                  const {
                    numero, idProcesos
                  } = carpeta;

                  if ( !idProcesos || idProcesos.length === 0 ) {
                    return {
                      numero: String(
                        numero
                      ),
                      idProceso: 'idProceso'
                    };
                  }

                  return idProcesos.map(
                    (
                      idp
                    ) => {
                              return {
                                numero: String(
                                  numero
                                ),
                                idProceso: String(
                                  idp
                                ),
                              };
                    }
                  );
        }
      );
}


 */



export default async function Page (
  {
    params,
  }: {
    params: {
      numero: number;
      idProceso: number;
    };
  }
) {

      const {
        actuaciones
      } =  await fetchActuaciones(

        Number(
          params.idProceso
        )
      ) ;

      if ( !actuaciones || actuaciones.length === 0 ) {
        return notFound();
      }

      return (
        <Fragment key={params.idProceso}>
          <Suspense fallback={<Loader />}>

            {actuaciones.map(
              (
                actuacion, index
              ) => {
                        return (
                          <ActuacionComponent
                            key={ index } incomingActuacion={actuacion } initialOpenState={ true} />
                        );
              }
            )}
          </Suspense>
        </Fragment>
      );
}
