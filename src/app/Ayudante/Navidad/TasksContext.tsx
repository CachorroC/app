'use client';
import { IntTaskAction } from '#@/lib/types/context-actions';
import { Dispatch, ReactNode,  createContext, useContext, useReducer,  } from 'react';

export interface IntTask
{
  id: number;
  text: string;
  done: boolean;
  carpetaNumero: number | null;
  updatedAt: Date;
}

const TasksContext = createContext<IntTask[] | null>(
  null
);


const TasksDispatchContext = createContext<Dispatch<IntTaskAction>|null>(
  null
);

export function TasksProvider(
  {
    children, initialTasks
  }: { children: ReactNode; initialTasks: IntTask[]}
) {
      const [
        tasksReduced,
        dispatchTasks
      ] = useReducer(
        tasksReducer,
        initialTasks
      );

      return (
        <TasksContext.Provider value={tasksReduced}>
          <TasksDispatchContext.Provider value={dispatchTasks}>
            {children}
          </TasksDispatchContext.Provider>
        </TasksContext.Provider>
      );
}

export function useTasks() {
      const tasksContext = useContext(
        TasksContext
      );

      if ( !tasksContext ) {
        throw new Error(
          'tasks context must be used within a tasks provider '
        );
      }

      return tasksContext;
}

export function useDispatchTasks() {
      const tasksContext = useContext(
        TasksDispatchContext
      );

      if ( !tasksContext ) {
        throw new Error(
          'tasks context must be used within a tasks provider '
        );
      }

      return tasksContext;
}

function tasksReducer(
  tasks:IntTask[], action: IntTaskAction
) {
      const {
        type, task
      } = action;

      switch ( type ) {
          case 'added': {
            return [
              ...tasks,
              {
                id           : task.id,
                text         : task.text,
                done         : task.done,
                carpetaNumero: task.carpetaNumero,
                updatedAt    : task.updatedAt
              }
            ];
          }

          case 'changed': {
            return tasks.map(
              t => {
                        if ( t.id === task.id ) {
                          return task;
                        }

                        return t;

              }
            );
          }

          case 'deleted': {
            return tasks.filter(
              t => {
                        return t.id !== task.id;
              }
            );
          }

          default: {
            throw Error(
              'Unknown action: ' + type
            );
          }
      }
}
