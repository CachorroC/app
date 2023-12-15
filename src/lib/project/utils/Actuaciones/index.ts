import 'server-only';
import { cache } from 'react';
import { sleep } from 'project/helper';
import { intActuacion, ConsultaActuacion,  Message } from 'types/actuaciones';
import { getCarpetaByllaveProceso } from 'project/utils/Carpetas/carpetas';
import { carpetasCollection } from '../../../connection/collections';
import { prisma } from '#@/lib/connection/prisma';
import { Data } from '#@/lib/types/procesos';

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
          const json = ( await request.json() ) as Data;
          return json;
        }

        const data = ( await request.json() ) as ConsultaActuacion;

        const {
          actuaciones
        } = data;

        await NewUpdateActuaciones(
          actuaciones, idProceso
        );

        const json: Data = {
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
          ultimaActuacion.fechaActuacion
        )
              .getTime();

        const savedDate = carpeta?.fecha
          ? new Date(
            carpeta.fecha
          )
                .getTime()
          : null;

        const carpetasColl = await carpetasCollection();


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
                  ultimaActuacion.fechaActuacion
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
                  ultimaActuacion.fechaActuacion
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
                      isUltimaAct: ( ultimaActuacion.cant === ultimaActuacion.consActuacion )
                        ? true
                        : false,
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


export async function NewUpdateActuaciones (
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

        const carpeta = await prisma.carpeta.findFirst(
          {
            where: {
              idProcesos: {
                has: idProceso
              }
            }
          }
        );

        if ( !carpeta ) {
          throw new Error(
            'no hay carpeta por actualizar'
          );
        }

        try {
          for ( const actuacion of actuaciones ) {
            await prisma.actuacion.upsert(
              {
                where: {
                  idRegActuacion: actuacion.idRegActuacion
                },
                create: {
                  ...actuacion,
                  fechaActuacion: new Date(
                    actuacion.fechaActuacion
                  ),
                  fechaRegistro: new Date(
                    actuacion.fechaRegistro
                  ),
                  fechaInicial: actuacion.fechaInicial
                    ? new Date(
                      actuacion.fechaInicial
                    )
                    : null,
                  fechaFinal: actuacion.fechaFinal
                    ? new Date(
                      actuacion.fechaFinal
                    )
                    : null,
                  isUltimaAct: actuacion.cant === actuacion.consActuacion
                    ? true
                    : false,
                  idProceso: idProceso,

                },
                update: {
                  idProceso  : idProceso,
                  isUltimaAct: actuacion.cant === actuacion.consActuacion
                    ? true
                    : false,
                }


              }
            );
          }

        } catch ( createError ) {
          console.log(
            createError
          );
        }

        const incomingDate = new Date(
          ultimaActuacion.fechaActuacion
        );

        const incomingYear = incomingDate.getFullYear();

        const incomingMonth = incomingDate.getMonth();

        const incomingDay = incomingDate.getDate();
        console.log(
          `${ carpeta.numero } => la nueva fecha de la actuacion es: ${ new Date(
            incomingYear, incomingMonth, incomingDay
          ) } y el timezone offset es  ${ incomingDate.getTimezoneOffset() }
          raw: ${ ultimaActuacion.fechaActuacion }`
        );

        const savedDate = carpeta.fecha
          ? new Date(
            carpeta.fecha
          )

          : null;

        const savedYear = savedDate?.getFullYear();

        const savedMonth = savedDate?.getMonth();

        const savedDay = savedDate?.getDate();
        console.log(
          `${ carpeta.numero } => la fecha guardada en el servidor de LINK -  actuacion es: ${ new Date(
            savedYear ?? 0, savedMonth ?? 0, savedDay
          ) }`
        );

        const carpetasColl = await carpetasCollection();

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
                  ultimaActuacion.fechaActuacion
                )
                ,
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
                  incomingYear, incomingMonth, incomingDay
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
                      isUltimaAct: ( ultimaActuacion.cant === ultimaActuacion.consActuacion )
                        ? true
                        : false,
                      idProceso: idProceso
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
          `ocurrio un error en updateActuaciones ${ JSON.stringify(
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
              isUltimaAct: ( actuacion.cant === actuacion.consActuacion )
                ? true
                : false

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
          error: error
        };
      }
}