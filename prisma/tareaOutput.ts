import * as fs from 'fs/promises';

function TareaOutput () {
  const tareas = [
    {
      id          : 1,
      creationDate: new Date(),
      dueDate     : new Date(
        2023, 11, 1
      ),
      carpetaId : 174,
      text      : 'Hola popo tarea',
      isComplete: false,
      subTareas : [
        {
          text: 'la primer sub tarea',
          date: new Date(
            2023, 12, 24
          ),
          isComplete: true,
        },
        {
          text      : 'otra subsi',
          isComplete: false
        }
      ]
    },
    {
      id          : 1,
      creationDate: new Date(),
      carpetaId   : 256,
      text        : 'Hola popo tarea',
      isComplete  : false,
      subTareas   : [
        {
          text: 'la primer sub tarea',
          date: new Date(
            2023, 12, 24
          ),
          isComplete: true,
        },
        {
          text      : 'otra subsi',
          isComplete: false
        }
      ]
    },
    {
      id          : 1,
      creationDate: new Date(),
      dueDate     : new Date(
        2023, 10, 1
      ),
      text      : 'Hola popo tarea',
      isComplete: false,
      subTareas : [
        {
          text: 'la primer sub tarea',
          date: new Date(
            2023, 12, 24
          ),
          isComplete: true,
        },
        {
          text      : 'otra subsi',
          isComplete: false
        }
      ]
    },
    {
      id          : 1,
      creationDate: new Date(),
      text        : 'Hola popo tarea',
      isComplete  : false,
      subTareas   : [
        {
          text: 'la primer sub tarea',
          date: new Date(
            2024, 0, 3,
          ),
          isComplete: false,
        },
        {
          text      : 'otra subsi',
          isComplete: true
        }
      ]
    }
  ];
  return JSON.stringify(
    tareas
  );
}

console.log(
  `el output de las tareas en prisma tareaOutput es ${ TareaOutput() }`
);

fs.writeFile(
  'tarea.json', TareaOutput()
);