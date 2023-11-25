import 'server-only';
import { cache } from 'react';
import { sleep } from 'project/helper';
import { intActuacion, ConsultaActuacion, Data, Message } from 'types/actuaciones';
import { getCarpetaByllaveProceso } from 'project/utils/Carpetas/carpetas';
import { carpetasCollection } from '../../../connection/collections';
import { prisma } from '#@/lib/connection/prisma';

export async function fetchActuaciones(
  idProceso: number, index: number
) {
      try {
        await sleep(
          index
        );

        const request = await fetch(
          `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`,
          {
            next: {
              revalidate: 86400,
            },
          },
        );

        if ( !request.ok ) {
          const json = ( await request.json() ) as ConsultaActuacion;
          return json;
        }

        const data = ( await request.json() ) as Data;

        const {
          actuaciones
        } = data;

        await updateActuaciones(
          actuaciones, idProceso
        );

        const json: ConsultaActuacion = {
          StatusCode : request.status,
          Message    : request.statusText as Message,
          actuaciones: actuaciones,
        };
        return json;
      } catch ( error ) {
        if ( error instanceof Error ) {
          console.log(
            `${ idProceso }: error en la fetchActuaciones => ${ error.name } : ${ error.message }`,
          );
        }

        console.log(
          `${ idProceso }: : error en la  fetchActuaciones  =>  ${ error }`
        );

        return {
          StatusCode: 404,
          Message   : JSON.stringify(
            error
          ) as Message,
        };
      }
}

export const getActuaciones = cache(
  async (
    {
      idProceso, index
    }: { idProceso: number; index: number }
  ) => {
            try {
              const consultaActuaciones = await fetchActuaciones(
                idProceso, index
              );

              if (
                !consultaActuaciones.actuaciones
        || consultaActuaciones.actuaciones.length === 0
              ) {
                return null;
              }

              const {
                actuaciones
              } = consultaActuaciones;

              return actuaciones;
            } catch ( error ) {

              console.log(
                `error in getActuaciones ${ JSON.stringify(
                  error, null, 2
                ) }`
              );


              return null;
            }
  },
);

export async function  updateActuaciones(
  actuaciones: intActuacion[], idProceso: number
) {
      try {
        if ( actuaciones.length === 0 ) {
          throw new Error(
            'no hay actuaciones en el array updateActuaciones'
          );
        }

        const [
          ultimaActuacion,
          penUltimaActuacion
        ] = actuaciones;

        const carpeta = await getCarpetaByllaveProceso(
          ultimaActuacion.llaveProceso,
        );

        if ( !carpeta ) {
          throw new Error(
            'no hay carpeta por actualizar'
          );
        }

        const incomingDate = new Date(
          ultimaActuacion.fechaRegistro
        )
              .getTime();

        const savedDate = carpeta?.fecha
          ? new Date(
            carpeta.fecha
          )
                .getTime()
          : null;

        const carpetasColl = await carpetasCollection();

        if ( savedDate === incomingDate ) {
          return;
        }

        if ( !savedDate || savedDate < incomingDate ) {

          const updateCarpetawithActuaciones = await carpetasColl.updateOne(
            {
              $or: [
                {
                  llaveProceso: carpeta
                    ? carpeta.llaveProceso
                    : ultimaActuacion.llaveProceso
                },
                {
                  idProcesos: idProceso

                }
              ]
            },
            {
              $set: {
                fecha: new Date(
                  ultimaActuacion.actuacion
                ),
                ultimaActuacion: ultimaActuacion.actuacion === 'Fijacion estado'
                  ? penUltimaActuacion
                  : ultimaActuacion,
              },
            },
            {
              upsert: false,
            },
          );

          const updateCarpetaWithActuacionesToPrisma = await prisma.carpeta.update(
            {
              where: {
                numero: carpeta.numero
              },
              data: {
                fecha: new Date(
                  ultimaActuacion.actuacion
                ),
                revisado       : false,
                ultimaActuacion: {
                  connectOrCreate: {
                    where: {
                      idRegActuacion: ultimaActuacion.idRegActuacion
                    },
                    create: {
                      ...ultimaActuacion,
                      fechaActuacion: new Date(
                        ultimaActuacion.fechaActuacion
                      ),
                      fechaRegistro: new Date(
                        ultimaActuacion.fechaRegistro
                      ),
                      fechaInicial: ultimaActuacion.fechaInicial
                        ? new Date(
                          ultimaActuacion.fechaInicial
                        )
                        : null,
                      fechaFinal: ultimaActuacion.fechaFinal
                        ? new Date(
                          ultimaActuacion.fechaFinal
                        )
                        : null,
                      anotacion: ultimaActuacion.anotacion
                        ? ultimaActuacion.anotacion
                        : null,
                      isUltimaAct: (ultimaActuacion.cant === ultimaActuacion.consActuacion) ? true : false

                    }
                  }
                }
              }
            }
          );

          console.log(
            updateCarpetaWithActuacionesToPrisma
          );


          if ( !updateCarpetawithActuaciones ) {
            return;
          }

          if (
            updateCarpetawithActuaciones.modifiedCount > 0
        || updateCarpetawithActuaciones.upsertedCount > 0
          ) {
            console.log(
              `Actuaciones:
            - se modificaron ${ updateCarpetawithActuaciones.modifiedCount } carpetas
            - se insertaron ${ updateCarpetawithActuaciones.upsertedCount }
            - para un total de carpetas: ${ updateCarpetawithActuaciones.matchedCount }`
            );

          }
        }

        return;
      } catch ( error ) {
        console.log(
          `ocurrio un error en updateActuaciones ${  JSON.stringify(
            error, null, 2
          ) }`
        );
        return;
      }
}

export const deleteProcesoPrivado = async (
  {
    idProceso,
  }: {
    idProceso: number;
  }
) => {
          const collection = await carpetasCollection();

          const deleteOne = await collection.deleteOne(
            {
              idProceso: idProceso,
            }
          );

          if ( deleteOne.deletedCount > 0 ) {
            return true;
          }

          return false;
};


export async function createActuacionInPrisma (
  actuacion: intActuacion
) {
      try {
        const inserterInPrisma = await prisma.actuacion.create(
          {
            data: {
              ...actuacion,
              fechaActuacion: new Date(
                actuacion.fechaActuacion
              ),
              fechaRegistro: new Date(
                actuacion.fechaRegistro
              ),
              fechaFinal: actuacion.fechaFinal
                ? new Date(
                  actuacion.fechaFinal
                )
                : null,
              fechaInicial: actuacion.fechaInicial
                ? new Date(
                  actuacion.fechaInicial
                )
                : null,

            }
          }
        );

        return {
          ok  : true,
          data: inserterInPrisma
        };
      } catch ( error ) {
        console.log(
          JSON.stringify(
            error, null, 2
          )
        );
        return {
          ok   : false,
          error: error ?

        };
      }
}