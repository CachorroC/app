'use server';

import { notasCollection } from '#@/lib/connection/collections';
import { prisma } from '#@/lib/connection/prisma';
import { IntNota, NewNota } from '#@/lib/types/notas';

export async function addNotaToMongo(
  newData: NewNota
) {
      const collection = await notasCollection();

      const existentTask = await collection.findOne(
        {
          text: newData.text,
        }
      );

      if ( !existentTask ) {
        const insertTask = await collection.insertOne(
          {
            ...newData,
          }
        );

        if ( insertTask.acknowledged ) {
          return {
            success: true,
            data   : JSON.stringify(
              insertTask
            ),
          };
        }

        return {
          success: false,
          data   : JSON.stringify(
            insertTask
          ),
        };
      }

      const updateTask = await collection.updateOne(
        {
          text: newData.text,
        },
        {
          $set: {
            ...newData,
          },
        },
        {
          upsert: true,
        },
      );

      if ( updateTask.modifiedCount >= 1 ) {
        return {
          success: true,
          data   : JSON.stringify(
            updateTask, null, 2
          ),
        };
      }

      return {
        success: false,
        data   : JSON.stringify(
          updateTask, null, 2
        ),
      };
}

export async function addNotaToPrisma(
  incomingTask: NewNota
) {
      try {
        const {
          carpetaNumero, ...task
        } = incomingTask;
        let inserter;
        let count = 0;

        if ( carpetaNumero ) {
          const carpeta = await prisma.carpeta.findFirstOrThrow(
            {
              where: {
                numero: carpetaNumero
              }
            }
          );

          if ( carpeta.notasCount ) {
            count = carpeta.notasCount;
          }
        } else {
          const counted = await prisma.nota.count();
          count = counted;
        }



        if ( carpetaNumero ) {
          inserter = await prisma.nota.create(
            {
              data: {
                ...task,
                id     : `${ carpetaNumero }-${ count++ }`,
                carpeta: {
                  connect: {
                    numero: carpetaNumero,
                  },
                },
              },
            }
          );
        } else {
          inserter = await prisma.nota.create(
            {
              data: {
                id: `${ Date.now() }-${ count++ }`,
                ...task,
              },
            }
          );
        }

        console.log(
          inserter
        );
        return {
          success: true,
          nextId : inserter.id + 1,
          data   : JSON.stringify(
            inserter, null, 2
          ),
        };
      } catch ( error ) {
        console.log(
          error
        );
        return {
          success: false,
          nextId : 0,
          data   : JSON.stringify(
            error, null, 2
          ),
        };
      }
}

export async function updateNotaTextState(
  prevState: IntNota
) {
      try {
        const updater = await prisma.nota.update(
          {
            where: {
              id: prevState.id
            },
            data: {
              text: prevState.text,
            },
          }
        );
        return {
          ...updater,
        };
      } catch ( error ) {
        console.log(
          error
        );
        return prevState;
      }
}
