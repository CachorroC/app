import { cache } from 'react';
import { Despacho } from 'types/despachos';
import { ConsultaNumeroRadicacion, intProceso } from 'types/procesos';
import { NewJuzgado } from '#@/lib/models/demanda';
import { carpetasCollection } from '#@/lib/connection/collections';
import { prisma } from '#@/lib/connection/prisma';
import { DespachoJudicial } from '#@/lib/types/carpetas';

export const getDespachos = cache(
  async () => {
            try {
              const request = await fetch(
                'https://app.rsasesorjuridico.com/despachos.json',
                {
                  headers: {
                    'CF-Access-Client-Id'    : `${ process.env.CF_ACCESS_CLIENT_ID }`,
                    'CF-Access-Client-Secret': `${ process.env.CF_ACCESS_CLIENT_SECRET }`,
                  },
                },
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
  llaveProceso: string 
) {
      try {
        const req = await fetch(
          `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Procesos/Consulta/NumeroRadicacion?numero=${ llaveProceso }&SoloActivos=false&pagina=1`,
        );

        if ( !req.ok ) {
          throw new Error(
            'request not ok' 
          );
        }

        const response = ( await req.json() ) as ConsultaNumeroRadicacion;
        return response;
      } catch ( error ) {
        console.log(
          error 
        );
        return null;
      }
}

export const getProceso = cache(
  async (
    llaveProceso: string 
  ) => {
            try {
              const fetchProcesoByNumero = await fetchProceso(
                llaveProceso 
              );

              if ( !fetchProcesoByNumero || fetchProcesoByNumero.procesos.length === 0 ) {
                throw new Error(
                  `no hay procesos existentes con esta llaveProceso: ${ llaveProceso }`,
                );
              }

              const {
                procesos 
              } = fetchProcesoByNumero;

              return procesos.map(
                (
                  proceso 
                ) => {
                          return {
                            ...proceso,
                            fechaProceso: proceso.fechaProceso
                              ? new Date(
                                proceso.fechaProceso 
                              )
                              : null,
                            fechaUltimaActuacion: proceso.fechaUltimaActuacion
                              ? new Date(
                                proceso.fechaUltimaActuacion 
                              )
                              : null,
                            juzgado: new DespachoJudicial(
                              proceso 
                            ),
                          };
                } 
              );
            } catch ( error ) {
              console.log(
                `error en getProcesos ${ JSON.stringify(
                  error, null, 2 
                ) }` 
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
            llaveProceso,
            idProceso,
            esPrivado,
            departamento,
            sujetosProcesales,
            despacho,
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
            ),
          };

          const updateProceso = await collection.updateOne(
            {
              $or: [ {
                llaveProceso: llaveProceso,
              },
              {
                idProcesos: idProceso,
              }, ],
            },
            {
              $addToSet: {
                idProcesos: idProceso,
                procesos  : newProceso,
              },
              $set: {
                'demanda.departamento'     : departamento,
                'demanda.expediente'       : llaveProceso,
                'demanda.sujetosProcesales': sujetosProcesales,
                'demanda.despacho'         : despacho,
              },
            },
            {
              upsert: false,
            },
          );

          const carpeta = await prisma.carpeta.findFirstOrThrow(
            {
              where: {
                llaveProceso: llaveProceso,
              },
            } 
          );

          const updateProcesoInPrisma = await prisma.carpeta.update(
            {
              where: {
                numero: carpeta.numero,
              },
              data: {
                procesos: {
                  connectOrCreate: {
                    where: {
                      idProceso: newProceso.idProceso,
                    },
                    create: {
                      ...proceso,
                      juzgado: {
                        connectOrCreate: {
                          where: {
                            tipo: newProceso.juzgado.tipo,
                          },
                          create: newProceso.juzgado,
                        },
                      },
                    },
                  },
                },
              },
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
          - matchedCount : ${ updateProceso.matchedCount }`,
            );
            continue;
          }

          continue;
        }

        return;
      } catch ( error ) {
        console.log(
          `error en updateProcesos ${ JSON.stringify(
            error, null, 2 
          ) }` 
        );
      }
}
