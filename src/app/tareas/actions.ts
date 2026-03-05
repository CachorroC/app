'use server';

import prisma from '#@/lib/connection/prisma';
import { NewTask } from '#@/lib/types/tareas';

/**
 * @deprecated Use addTaskToPrisma instead - MongoDB support has been removed
 */
export async function addTaskToMongo(newData: NewTask) {
  throw new Error('MongoDB support has been removed. Use addTaskToPrisma instead.');
}

export async function addTaskToPrisma(incomingTask: NewTask) {
  const { carpetaNumero, ...task } = incomingTask;

  let inserter;

  if (carpetaNumero) {
    inserter = await prisma.task.create({
      data: {
        ...task,
        carpeta: {
          connect: {
            numero: carpetaNumero,
          },
        },
      },
    });
  } else {
    inserter = await prisma.task.create({
      data: {
        ...task,
      },
    });
  }

  console.log(inserter);

  return {
    ...inserter,
  };
}

export async function updateTaskDoneState(prevState: {
  done: boolean;
  id: number;
}) {
  try {
    const updater = await prisma.task.update({
      where: {
        id: prevState.id,
      },
      data: {
        done: prevState.done,
      },
    });

    return {
      done: updater.done,
      id: updater.id,
    };
  } catch (error) {
    console.log(error);

    return prevState;
  }
}

export async function updateTaskTextState(prevState: IntTask) {
  try {
    const updater = await prisma.task.update({
      where: {
        id: prevState.id,
      },
      data: {
        text: prevState.text,
        content: prevState.content,
      },
    });

    return {
      ...updater,
    };
  } catch (error) {
    console.log(error);

    return prevState;
  }
}
