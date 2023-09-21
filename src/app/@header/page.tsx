
import Header from '#@/components/layout/header';
import getCarpetas from '#@/lib/project/getCarpetas';

export default async function Page () {
  const carpetas = await getCarpetas();

  return (
    <Header carpetas={ carpetas} />
  );
}
