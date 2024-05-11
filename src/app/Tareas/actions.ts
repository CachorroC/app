'use server';

import { tareasCollection } from '#@/lib/connection/collections';
import { prisma } from '#@/lib/connection/prisma';
import { IntTask, NewTask } from '#@/lib/types/tareas';

export async function addTaskToMongo(
  newData: NewTask 
) {
  const collection = await tareasCollection();

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

  /* eslint-disable-next-line no-unused-vars */

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

export async function addTaskToPrisma(
  incomingTask: NewTask 
) {
  const {
    carpetaNumero, ...task 
  } = incomingTask;

  let inserter;

  if ( carpetaNumero ) {
    inserter = await prisma.task.create(
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
    inserter = await prisma.task.create(
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
    ...inserter,
  };
}

export async function updateTaskDoneState(
  prevState: {
  done: boolean;
  id: number;
} 
) {
  try {
    const updater = await prisma.task.update(
      {
        where: {
          id: prevState.id,
        },
        data: {
          done: prevState.done,
        },
      } 
    );
    return {
      done: updater.done,
      id  : updater.id,
    };
  } catch ( error ) {
    console.log(
      error 
    );
    return prevState;
  }
}

export async function updateTaskTextState(
  prevState: IntTask 
) {
  try {
    const updater = await prisma.task.update(
      {
        where: {
          id: prevState.id,
        },
        data: {
          text   : prevState.text,
          content: prevState.content,
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
