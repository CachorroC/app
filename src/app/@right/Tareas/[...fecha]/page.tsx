import { getTareas } from '#@/lib/project/tareas';

export default async function Page(
            {
                            params,
            }: {
  params: { fecha: string[] };
} 
) {
  const ano = params.fecha[ 0 ];

  const mes = params.fecha[ 1 ];

  const dia = params.fecha[ 2 ];

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
