
export default async function getIdProcesos () {
      const carpetas = await prisma.carpeta.findMany();
      return carpetas.faltMap(
        (
          carpeta 
        ) => {
                  return carpeta.idProcesos;
        } 
      );
}