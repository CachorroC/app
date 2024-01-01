import { IntTask } from '#@/app/Ayudante/Navidad/TasksContext';
import { prisma } from '#@/lib/connection/prisma';
import { IntTaskAction } from '#@/lib/types/context-actions';

export async function tasksAsyncReducer(
  tasks:IntTask[], action: IntTaskAction
) {
      try {
        const {
          type, task
        } = action;

        switch ( type ) {
            case 'added': {
              const newTask = await prisma.task.upsert(
                {
                  where: {
                    id: task.id
                  },
                  update: task,
                  create: task
                }
              );
              return [
                ...tasks,
                {
                  id           : newTask.id,
                  text         : newTask.text,
                  done         : newTask.done,
                  carpetaNumero: newTask.carpetaNumero,
                  updatedAt    : newTask.updatedAt
                }
              ];
            }

            case 'changed': {
              const upsertTask = await prisma.task.upsert(
                {
                  where: {
                    id: task.id
                  },
                  update: task,
                  create: task
                }
              );
              return tasks.map(
                t => {
                          if ( t.id === upsertTask.id ) {
                            return upsertTask;
                          }

                          return t;

                }
              );
            }

            case 'deleted': {
              const deleteTask = await prisma.task.delete(
                {
                  where: {
                    id: task.id
                  }
                }
              );
              return tasks.filter(
                t => {
                          return t.id !== deleteTask.id;
                }
              );
            }

            default: {
              throw Error(
                'Unknown action: ' + type
              );
            }
        }
      } catch ( error ) {
        console.log(
          `error en el tasksasyncReducer: ${ error }`
        );
        console.log(
          error
        );
        return tasks;
      }
}
