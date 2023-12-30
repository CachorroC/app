
import { AddTask } from './AddTask';
import TaskList from './TaskList';
import { TasksProvider } from './TasksContext';
import layout from '#@/styles/layout.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { prisma } from '#@/lib/connection/prisma';


export default async function TaskApp () {


      const tasks = await prisma.task.findMany();
      return (
        <TasksProvider initialTasks={ tasks }>
          <div className={ layout.top }>
            <div className={ layout.sectionRow }>
              <h2 className={typography.headlineLarge}>add task</h2>
              <AddTask />
            </div>
          </div>


          <div className={layout.left}>
            <TaskList />
          </div>

        </TasksProvider>
      );
}
