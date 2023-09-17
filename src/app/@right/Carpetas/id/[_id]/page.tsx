'use client';

import { useCarpetaContext } from '#@/app/context/carpeta-context';
import { Card } from '#@/components/Card';
import { CarpetaCard } from '#@/components/Card/carpeta';
import { Fragment } from 'react';

export default function Page (
  {
    params
  }: {params: {_id: string}}
) {
  const {
    inputCarpeta
  } = useCarpetaContext();

  return (
    <Fragment key={ params._id }>
      <Card path={ '/Carpetas' } key={params._id} carpeta={ {
        ...inputCarpeta,
        _id   : params._id,
        nombre: ''
      } } >

        <CarpetaCard key={ params._id } carpeta={ {
          ...inputCarpeta,
          _id   : params._id,
          nombre: ''
        } } />
      </Card>
    </Fragment>
  );
}