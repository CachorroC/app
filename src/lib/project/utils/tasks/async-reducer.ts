
import { prisma } from '#@/lib/connection/prisma';
import { NotaAction } from '#@/lib/types/task-context-actions';
import { IntTask } from '#@/lib/types/tareas';

export async function tasksAsyncReducer(
  tasks: IntTask[],
  action: NotaAction,
) {
      try {
        const {
          type
        } = action;

        switch ( type ) {
            case 'added': {
              const {
                task
              } = action;

              const newTask = await prisma.task.upsert(
                {
                  where: {
                    id: task.id,
                  },
                  update: task,
                  create: task,
                }
              );
              return [ ...tasks,
                {
                  id           : newTask.id,
                  text         : newTask.text,
                  done         : newTask.done,
                  carpetaNumero: newTask.carpetaNumero,
                  updatedAt    : newTask.updatedAt,
                }, ];
            }

            case 'changed': {
              const {
                task
              } = action;

              const upsertTask = await prisma.task.upsert(
                {
                  where: {
                    id: task.id,
                  },
                  update: task,
                  create: task,
                }
              );
              return tasks.map(
                (
                  t
                ) => {
                          if ( t.id === upsertTask.id ) {
                            return upsertTask;
                          }

                          return t;
                }
              );
            }

            case 'deleted': {
              const {
                id
              } = action;

              const deleteTask = await prisma.task.delete(
                {
                  where: {
                    id: id,
                  },
                }
              );
              return tasks.filter(
                (
                  t
                ) => {
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
