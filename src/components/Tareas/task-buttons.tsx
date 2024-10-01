'use client';
import { useDispatchTasks } from './TasksContext';
import { deleteTask } from './actions';

export function DeleteTaskButton( {
  id 
}: { id: number } ) {
  const dispatchTasks = useDispatchTasks();

  async function deleter() {
    const deleted = await deleteTask( {
      id: id,
    } );

    return dispatchTasks( {
      type: 'deleted',
      id  : deleted.id,
    } );
  }

  return (
    <button
      type="button"
      onClick={deleter}
    >
      <span>{id}</span>
      <span className="material-symbols-outlined">delete_forever</span>
    </button>
  );
}
