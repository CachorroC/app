'use client';
import { IntTask, TaskAction } from '#@/lib/types/tareas';
import { Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer, } from 'react';

const TasksContext = createContext<IntTask[] | null>( null );

const TasksDispatchContext = createContext<Dispatch<TaskAction> | null>( null );

export function TasksProvider( {
  children,
  initialTasks,
}: {
  children    : ReactNode;
  initialTasks: IntTask[];
} ) {
  const [
    tasksReduced,
    dispatchTasks
  ] = useReducer(
    tasksReducer, initialTasks 
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
  const tasksContext = useContext( TasksContext );

  if ( !tasksContext ) {
    throw new Error( 'tasks context must be used within a tasks provider ' );
  }

  return tasksContext;
}

export function useDispatchTasks() {
  const tasksContext = useContext( TasksDispatchContext );

  if ( !tasksContext ) {
    throw new Error( 'tasks context must be used within a tasks provider ' );
  }

  return tasksContext;
}

function tasksReducer(
  tasks: IntTask[], action: TaskAction 
) {
  const {
    type 
  } = action;

  switch ( type ) {
      case 'added': {
        const {
          task 
        } = action;

        return [
          ...tasks,
          {
            ...task,
            id           : task.id,
            text         : task.text,
            done         : task.done,
            carpetaNumero: task.carpetaNumero,
            updatedAt    : task.updatedAt,
          },
        ];
      }

      case 'changed': {
        const {
          task 
        } = action;

        return tasks.map( ( t ) => {
          if ( t.id === task.id ) {
            return task;
          }

          return t;
        } );
      }

      case 'deleted': {
        const {
          id 
        } = action;

        return tasks.filter( ( t ) => {
          return t.id !== id;
        } );
      }

      default: {
        throw Error( 'Unknown action: ' + type );
      }
  }
}
