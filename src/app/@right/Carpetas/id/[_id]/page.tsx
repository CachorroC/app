import { Card } from '#@/components/Card';
import { CarpetaCard } from '#@/components/Card/carpeta';
import { getCarpetaById } from '#@/lib/project/carpetas';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

export default async function Page(
  {
    params
  }: { params: { _id: string } }
) {
  const carpeta = await getCarpetaById(
    params._id
  );

  if ( !carpeta ) {
    return notFound();
  }

  return (
    <Fragment key={params._id}>
      <Card
        path={ '/Carpetas' }
        key={ params._id }
        carpeta={ carpeta }  >
        <CarpetaCard
          key={params._id}
          carpeta={carpeta}
        />
      </Card>
    </Fragment>
  );
}
