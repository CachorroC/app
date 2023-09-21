import getCarpetas from '#@/lib/project/getCarpetas';
import Header from 'components/layout/header';

export default async function Default () {
  const carpetas = await getCarpetas();

  return (
    <Header carpetas={ carpetas } />
  );
}
