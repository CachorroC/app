import { CarpetaFormProvider } from '#@/app/Context/carpeta-form-context';
import { Loader } from '#@/components/Loader';
import { NombreComponent } from '#@/components/nombre';
import styles from '#@/styles/layout.module.css';
import { Route } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import { NotasLinkList } from './notas-list';
import { prisma } from '#@/lib/connection/prisma';




export const dynamicParams = true;
//? Generate segments for [numero]



export default async function LayoutCarpetaMain(
  {
    children,
    top,
    right,
    params,
  }: {
    children: ReactNode;
    top: ReactNode;
    right: ReactNode;
    params: { numero: string };
  }
) {
      const  carpeta = await prisma.carpeta.update(
        {
          where: {
            numero: Number(
              params.numero
            )
          },
          data: {
            revisado: true
          },
          include: {
            ultimaActuacion: true,
            deudor         : true,
            codeudor       : true,
            notas          : true,
            tareas         : true,
            demanda        : {
              include: {
                notificacion: {
                  include: {
                    notifiers: true
                  }
                },
                medidasCautelares: true
              }
            },
            procesos: {
              include: {
                juzgado: true
              }
            },
          }
        }
      );


      if ( !carpeta ) {
        return notFound();
      }

      return (

        <CarpetaFormProvider
          key={params.numero}
          carpeta={carpeta}
        >
          {carpeta.nombre}
          <div className={styles.top}>
            <Suspense fallback={<Loader />}>
              <Link href={`/Carpeta/${ params.numero }` as Route}>
                {carpeta.deudor && (
                  <NombreComponent
                    key={params.numero}
                    deudor={carpeta.deudor}
                  />
                )}
              </Link>
            </Suspense>
            {top}
          </div>
          <div className={styles.leftColumn}>{children}</div>
          <div className={styles.right}>
            {right}
            <NotasLinkList
              carpetaNumero={Number(
                params.numero
              )}
              key={params.numero}
            />
          </div>
        </CarpetaFormProvider>

      );
}
