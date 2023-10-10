import { getTareas } from '#@/lib/project/tareas';

export default async function Page(
  {
    params,
  }: {
  params: { fecha: string[] };
} 
) {
  const [
    ano,
    mes,
    dia
  ] = params.fecha;

  const rawTareas = await getTareas();

  const matched = rawTareas.filter(
    (
      tarea 
    ) => {
      const fecha = new Date(
        Number(
          ano 
        ), Number(
          mes 
        ), Number(
          dia 
        ) 
      );

      return tarea.date === fecha;
    } 
  );

  return (
    <>
      {matched.map(
        (
          tarea, i 
        ) => {
          return (
            <div key={i}>
              <p>{tarea.text}</p>
            </div>
          );
        } 
      )}
    </>
  );
}
