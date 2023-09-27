import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import { Form } from 'components/form/Form';
import Link from 'next/link';
import type{ Route } from 'next';
import layout from '#@/styles/layout.module.css';
import { CarpetaCard } from 'components/Card/carpeta';
import { Loader } from 'components/Loader';
import { NombreComponent } from 'components/nombre';
import { Fragment, Suspense } from 'react';
import { NuevoProceso } from '#@/components/form/nuevo-proceso';

export default async function PageCarpetaNumero(
  {
    params,
  }: {
  params: { numero: number };
}
) {
  const carpeta = await getCarpetabyNumero(
    Number(
      params.numero
    )
  );

  if ( !carpeta ) {
    return (
      <div className={ layout.left }>
        <NuevoProceso />
      </div>
    );
  }

  return (
    <>
      <div className={ layout.top }>
        <Link
          href={`/Carpetas/id/${ carpeta._id }` as Route}
        >{`${ carpeta._id }`}</Link>
        {carpeta && (
          <Fragment key={params.numero}>
            <Suspense fallback={<Loader />}>
              <NombreComponent
                key={carpeta._id}
                deudor={carpeta.deudor}
              />
            </Suspense>

            <CarpetaCard
              key={carpeta._id}
              carpeta={carpeta}
            />
          </Fragment>
        )}
      </div>
      <div className={ layout.left }>

        <Form
          key={params.numero}
          carpeta={carpeta}
        />
      </div>
    </>
  );
}
