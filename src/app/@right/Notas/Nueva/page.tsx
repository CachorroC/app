import NoteFormOutput from '#@/components/Nota/client/note-form-output';
import TaskList from '#@/components/Nota/tasks-list';

export default function Page() {
  return (
    <>
      <NoteFormOutput />
      <TaskList />
    </>
  );
}
