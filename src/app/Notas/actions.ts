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
      const {
        carpetaNumero, ...task
      } = incomingTask;

      let inserter;

      try {
        if ( carpetaNumero ) {
          inserter = await prisma.nota.create(
            {
              data: {
                ...task,
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
              id_text: {
                text: prevState.text,
                id  : prevState.id
              },
              carpetaNumero: prevState.carpetaNumero
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
