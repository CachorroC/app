'use client';
import { useState } from 'react';
import { useDispatchTasks, useTasks } from './TasksContext';
import { DeleteTaskButton } from './task-buttons';
import { EditTask } from './EditTask';
import { inputElement,
  slider,
  switchBox, } from '#@/components/Form/form.module.css';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { IntTask } from '#@/lib/types/tareas';

export default function TaskList() {
      const tasksRaw = useTasks();

      const tasks = [ ...tasksRaw ].sort(
        (
          a, b 
        ) => {
                  if ( !a.id ) {
                    return -1;
                  }

                  if ( !b.id ) {
                    return 1;
                  }

                  if ( a.id < b.id ) {
                    return -1;
                  }

                  if ( b.id < a.id ) {
                    return 1;
                  }

                  return 0;
        } 
      );

      return (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>terminado</th>
              <th>contenido</th>
              <th>salvar</th>
              <th>idk</th>
              <th>creada o editada</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(
              (
                task 
              ) => {
                        return (
                          <Task
                            task={task}
                            key={task.id}
                          />
                        );
              } 
            )}
          </tbody>
        </table>
      );
}

function Task(
  {
    task 
  }: { task: IntTask } 
) {
      const [ isEditing, setIsEditing ] = useState(
        false 
      );

      const dispatchTasks = useDispatchTasks();

      let taskContent;

      if ( isEditing ) {
        taskContent = (
          <>
            <td>
              <EditTask
                initialTask={task}
                key={task.id}
              />
            </td>
            <td>
              <button
                type={'button'}
                onClick={() => {
                          return setIsEditing(
                            false 
                          );
                }}
              >
            Save
              </button>
            </td>
          </>
        );
      } else {
        taskContent = (
          <>
            <td> {task.text}</td>
            <td>
              <button
                type={'button'}
                onClick={() => {
                          return setIsEditing(
                            true 
                          );
                }}
              >
            Edit
              </button>
            </td>
          </>
        );
      }

      return (
        <tr>
          <td>
            {task.id}
            {/*    <input
              name={ 'id' }
              disabled={true}
              type={'number'}
              value={task.id}
              onChange={ e => {
                        dispatchTasks(
                          {
                            type: 'changed',
                            task: {
                              ...task,
                              id: Number(
                                e.target.value
                              )
                            }
                          }ngo
                        );
              }
              } /> */}
          </td>
          <td>
            <label className={switchBox}>
              <input
                name="done"
                className={inputElement}
                checked={task.done}
                onChange={(
                  e 
                ) => {
                          dispatchTasks(
                            {
                              type: 'changed',
                              task: {
                                ...task,
                                done: e.target.checked,
                              },
                            } 
                          );
                }}
                type="checkbox"
              />
              <span className={slider}></span>
            </label>
          </td>
          {taskContent}
          <td>
            <DeleteTaskButton
              key={task.id}
              id={task.id ?? 0}
            />
          </td>
          <td>{OutputDateHelper(
            task.updatedAt 
          )}</td>
        </tr>
      );
}
