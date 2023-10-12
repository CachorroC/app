import { getTareas } from '#@/lib/project/tareas';
import styles from 'components/form/form.module.css';
import typography from '#@/styles/fonts/typography.module.css';

export default async function PageTareas() {
  const tareas = await getTareas();

  return (
    <>
      {tareas.map(
        (
          tarea 
        ) => {
          return (
            <div
              key={tarea.id}
              className={styles.form}
            >
              <p className={typography.bodySmall}>{tarea.text}</p>
            </div>
          );
        } 
      )}
    </>
  );
}
