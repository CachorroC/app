import { cache } from 'react';
import { sleep } from 'project/helper';
import { Despacho } from 'types/despachos';
import { intProceso, ConsultaNumeroRadicacion, Data, Message } from 'types/procesos';
import { NewJuzgado } from '#@/lib/models/demanda';
import { carpetasCollection } from '#@/lib/connection/collections';
import { prisma } from '#@/lib/connection/prisma';

export const getDespachos = cache(
  async () => {
            try {
              const request = await fetch(
                'https://app.rsasesorjuridico.com/despachos.json', {
                  headers: {
                    'CF-Access-Client-Id'    : `${ process.env.CF_ACCESS_CLIENT_ID }`,
                    'CF-Access-Client-Secret': `${ process.env.CF_ACCESS_CLIENT_SECRET }`
                  }
                }
              );

              if ( !request.ok ) {
                throw new Error(
                  'error en los despachos'
                );
              }

              const response = ( await request.json() ) as Despacho[];

              return response;
            } catch ( e ) {
              if ( e instanceof Error ) {
                console.log(
                  ` error en la conexion network del getDespacxhos ${ e.name } : ${ e.message }`,
                );
              }

              console.log(
                ` error en la conexion network del getDespacxho  =>  ${ e }`
              );

              return [];
            }
  }
);

export async function fetchProceso(
  llaveProceso: string, index: number
) {
      try {
        await sleep(
          index
        );

        const req = await fetch(
          `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Procesos/Consulta/NumeroRadicacion?numero=${ llaveProceso }&SoloActivos=false&pagina=1`

        );

        if ( !req.ok ) {
          const jsonError = ( await req.json() ) as Data;
          return jsonError;
        }

        const json = ( await req.json() ) as ConsultaNumeroRadicacion;

        const {
          procesos
        } = json;

        updateProcesos(
          procesos
        );

        const responseReturn: Data = {
          StatusCode: req.status,
          Message   : req.statusText as Message,
          procesos  : procesos
        };

        return responseReturn;
      } catch ( e ) {
        if ( e instanceof Error ) {
          console.log(
            `Expediente: ${ llaveProceso }: error en la conexion network del fetchProceso ${ e.name } : ${ e.message }`,
          );

        }

        console.log(
          `Expediente: ${ llaveProceso }: : error en la conexion network del fetchProceso  =>  ${ e }`,
        );

        return {
          StatusCode: 404,
          Message   : JSON.stringify(
            e
          ) as Message
        };
      }
}

export const getProceso = cache(
  async(
    {
      llaveProceso, index
    }:
    {  llaveProceso: string, index: number}
  ) => {
            try {
              const fetchP = await fetchProceso(
                llaveProceso, index
              );


              if ( !fetchP.procesos || fetchP.procesos.length === 0 ) {
                return null;
              }

              const {
                procesos
              } = fetchP;

              return procesos;


            } catch ( error ) {
              console.log(
                `error en getProcesos ${ JSON.stringify(
                  error, null, 2
                )
                }`
              );
              return null;
            }
  }
);


export async function updateProcesos(
  procesos: intProceso[]
) {
      try {
        if ( procesos.length === 0 ) {
          throw new Error(
            'no hay procesos en el array updateProcesos'
          );
        }

        const collection = await carpetasCollection();

        for ( const proceso of procesos ) {
          const {
            llaveProceso, idProceso, esPrivado, departamento, sujetosProcesales, despacho
          } = proceso;



          if ( esPrivado ) {
            console.log(
              'el proceso es privado'
            );
            continue;
          }

          const newProceso = {
            ...proceso,
            juzgado: new NewJuzgado(
              proceso
            )
          };

          const updateProceso = await collection.updateOne(
            {
              $or: [
                {
                  llaveProceso: llaveProceso
                },
                {
                  idProcesos: idProceso

                }
              ]
            }, {
              $addToSet: {
                idProcesos: idProceso,
                procesos  : newProceso,
              },
              $set: {
                'demanda.departamento'     : departamento,
                'demanda.expediente'       : llaveProceso,
                'demanda.sujetosProcesales': sujetosProcesales,
                'demanda.despacho'         : despacho
              },
            }, {
              upsert: false
            }
          );

          const carpeta = await prisma.carpeta.findFirstOrThrow(
            {
              where: {
                llaveProceso: llaveProceso
              }
            }
          );

          const updateProcesoInPrisma = await prisma.carpeta.update(
            {
              where: {
                numero: carpeta.numero
              },
              data: {
                procesos: {
                  connectOrCreate: {
                    where: {
                      idProceso: newProceso.idProceso
                    },
                    create: {
                      ...proceso,
                      juzgado: {
                        connectOrCreate: {
                          where: {
                            tipo: newProceso.juzgado.tipo
                          },
                          create: newProceso.juzgado
                        }
                      }
                    }
                  }
                }
              }
            }
          );

          console.log(
            `update proceso in prisma: ${ updateProcesoInPrisma }`
          );

          if ( updateProceso.modifiedCount > 0 || updateProceso.matchedCount > 0 ) {
            console.log(
              `Procesos:
          - se actualizaron ${ updateProceso.modifiedCount } procesos
          - se insertaron ${ updateProceso.upsertedCount } procesosn nuevos;
          - matchedCount : ${ updateProceso.matchedCount }`
            );
            continue;
          }

          continue;
        }

        return;
      } catch ( error ) {
        console.log(
          `error en updateProcesos ${    JSON.stringify(
            error, null, 2
          ) }`
        );
      }

}
