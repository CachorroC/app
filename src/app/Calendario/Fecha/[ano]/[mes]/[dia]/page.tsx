export default async function Page( {
  params,
}: {
  params: Promise<{ ano: string; mes: string; dia: string }>;
  } ) {
  const {
    ano, mes, dia 
  } = await params;

  return <pre>{JSON.stringify(
    {
      ano,
      mes,
      dia
    }, null, 2
  )}</pre>;
}
