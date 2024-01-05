import 'server-only';
import { cache } from 'react';
import { intActuacion,
  ConsultaActuacion,
  outActuacion, } from 'types/actuaciones';
import { getCarpetaByllaveProceso } from 'project/utils/Carpetas/carpetas';
import { carpetasCollection } from '../../../connection/collections';
import { prisma } from '#@/lib/connection/prisma';
import { sleep } from '../../helper';
import { updateUltimaActuacionInPrisma } from './updater';

export async function fetchActuaciones(
  idProceso: number, index: number = 1 
) {
      await sleep(
        index 
      );

      try {
        const request = await fetch(
          `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`,
        );

        if ( !request.ok ) {
          throw new Error(
            `${ idProceso }: ${ request.status } ${ request.statusText }${ JSON.stringify(
              request,
              null,
              2,
            ) }`,
          );
        }

        const json = ( await request.json() ) as ConsultaActuacion;

        const {
          actuaciones 
        } = json;

        const outActuaciones = actuaciones.map(
          (
            actuacion 
          ) => {
                    return {
                      ...actuacion,
                      isUltimaAct: actuacion.cant === actuacion.consActuacion,
                      idProceso  : idProceso,
                    };
          } 
        );

        const [ ultimaActuacion ] = outActuaciones;
        updateUltimaActuacionInPrisma(
          ultimaActuacion 
        );
        return outActuaciones;
      } catch ( error ) {
        if ( error instanceof Error ) {
          console.log(
            `${ idProceso }: error en la fetchActuaciones => ${ error.name } : ${ error.message }`,
          );
        }

        console.log(
          `${ idProceso }: : error en la  fetchActuaciones  =>  ${ error }` 
        );

        return null;
      }
}

export const getActuaciones = cache(
  async (
    idProceso: number 
  ) => {
            return fetchActuaciones(
              idProceso 
            );
  } 
);

export async function updateActuaciones(
  actuaciones: intActuacion[],
  idProceso: number,
) {
      try {
        if ( actuaciones.length === 0 ) {
          throw new Error(
            'no hay actuaciones en el array updateActuaciones' 
          );
        }

        const [ ultimaActuacion ] = actuaciones;

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
              $or: [ {
                llaveProceso: carpeta
                  ? carpeta.llaveProceso
                  : ultimaActuacion.llaveProceso,
              },
              {
                idProcesos: idProceso,
              }, ],
            },
            {
              $set: {
                fecha: new Date(
                  ultimaActuacion.fechaActuacion 
                ),
                idRegUltimaAct : ultimaActuacion.idRegActuacion,
                ultimaActuacion: {
                  ...ultimaActuacion,
                  isUltimaAct:
                ultimaActuacion.cant === ultimaActuacion.consActuacion,
                  idProceso: idProceso,
                },
              },
            },
            {
              upsert: false,
            },
          );

          const updateCarpetaWithActuacionesToPrisma = await prisma.carpeta.update(
            {
              where: {
                numero: carpeta.numero,
              },
              data: {
                fecha: new Date(
                  ultimaActuacion.fechaActuacion 
                ),
                revisado       : false,
                ultimaActuacion: {
                  connectOrCreate: {
                    where: {
                      idRegActuacion: ultimaActuacion.idRegActuacion,
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
                      isUltimaAct:
                  ultimaActuacion.cant === ultimaActuacion.consActuacion
                    ? true
                    : false,
                      idProceso: idProceso,
                    },
                  },
                },
              },
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
            - para un total de carpetas: ${ updateCarpetawithActuaciones.matchedCount }`,
            );
          }
        }

        return;
      } catch ( error ) {
        console.log(
          `ocurrio un error en updateActuaciones ${ JSON.stringify(
            error, null, 2 
          ) }`,
        );
        return;
      }
}

export async function NewUpdateActuaciones(
  actuaciones: outActuacion[],
  idProceso: number,
) {
      try {
        if ( actuaciones.length === 0 ) {
          throw new Error(
            'no hay actuaciones en el array updateActuaciones' 
          );
        }

        const [ ultimaActuacion ] = actuaciones;

        const carpeta = await prisma.carpeta.findFirst(
          {
            where: {
              idProcesos: {
                has: idProceso,
              },
            },
          } 
        );

        if ( !carpeta ) {
          throw new Error(
            'no hay carpeta por actualizar' 
          );
        }

        const incomingDate = new Date(
          ultimaActuacion.fechaActuacion 
        );

        const incomingYear = incomingDate.getFullYear();

        const incomingMonth = incomingDate.getMonth();

        const incomingDay = incomingDate.getDate();

        const savedDate = carpeta.fecha
          ? new Date(
            carpeta.fecha 
          )
          : null;

        const carpetasColl = await carpetasCollection();

        if ( !savedDate || savedDate < incomingDate ) {
          const updateCarpetawithActuaciones = await carpetasColl.updateOne(
            {
              $or: [ {
                llaveProceso: ultimaActuacion.llaveProceso,
              },
              {
                idProcesos: idProceso,
              }, ],
            },
            {
              $addToSet: {
                actuaciones: ultimaActuacion,
              },
              $set: {
                fecha: new Date(
                  ultimaActuacion.fechaActuacion 
                ),
                revisado       : false,
                idRegUltimaAct : ultimaActuacion.idRegActuacion,
                ultimaActuacion: {
                  ...ultimaActuacion,
                  isUltimaAct:
                ultimaActuacion.cant === ultimaActuacion.consActuacion,
                  idProceso: idProceso,
                },
              },
            },
            {
              upsert: false,
            },
          );

          const updateCarpetaWithActuacionesToPrisma = await prisma.carpeta.update(
            {
              where: {
                numero: carpeta.numero,
              },
              data: {
                fecha: new Date(
                  incomingYear, incomingMonth, incomingDay 
                ),
                revisado       : false,
                ultimaActuacion: {
                  connectOrCreate: {
                    where: {
                      idRegActuacion: ultimaActuacion.idRegActuacion,
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
                      isUltimaAct:
                  ultimaActuacion.cant === ultimaActuacion.consActuacion
                    ? true
                    : false,
                      idProceso: idProceso,
                    },
                  },
                },
              },
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
            - para un total de carpetas: ${ updateCarpetawithActuaciones.matchedCount }`,
            );
          }
        }

        try {
          for ( const actuacion of actuaciones ) {
            await prisma.actuacion.upsert(
              {
                where: {
                  idRegActuacion: actuacion.idRegActuacion,
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
                  isUltimaAct:
              actuacion.cant === actuacion.consActuacion
                ? true
                : false,
                  idProceso: idProceso,
                },
                update: {
                  idProceso: idProceso,
                  isUltimaAct:
              actuacion.cant === actuacion.consActuacion
                ? true
                : false,
                },
              } 
            );
          }
        } catch ( createError ) {
          console.log(
            createError 
          );
        }

        return;
      } catch ( error ) {
        console.log(
          `ocurrio un error en updateActuaciones ${ JSON.stringify(
            error, null, 2 
          ) }`,
        );
        return;
      }
}
