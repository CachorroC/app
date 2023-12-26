export default function Page(
  {
    params,
  }: {
    params: { ano: string; mes: string; dia: string };
  } 
) {
      return <pre>{JSON.stringify(
        params, null, 2 
      )}</pre>;
}
