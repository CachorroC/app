import { cache } from 'react';
import  { carpetasCollection } from '#@/lib/connection/mongodb';
import { sleep } from '#@/lib/project/helper';
import { intJuzgado } from 'types/carpetas';
import { Despacho } from 'types/despachos';
import { Proceso, ConsultaNumeroRadicacion, Data, Message } from 'types/procesos';

export const getDespachos = cache(
  async () => {
    try {
      const request = await fetch(
        '/despachos.json'
      );

      if ( !request.ok ) {
        throw new Error(
          'error en los despachos'
        );
      }

      const response = ( await request.json() ) as Despacho[];

      return response;
    } catch ( e ) {
      if ( e instanceof Error ) {
        console.log(
          ` error en la conexion network del getDespacxhos ${ e.name } : ${ e.message }`,
        );
      }

      console.log(
        ` error en la conexion network del getDespacxho  =>  ${ e }`
      );

      return [];
    }
  }
);

export async function newJuzgado(
  procesos: Proceso[]
) {
  const juzgados = new Map<number, intJuzgado>();

  const Despachos = await getDespachos();

  for ( const proceso of procesos ) {
    const indexOf = procesos.indexOf(
      proceso
    );

    const matchedDespacho = Despachos.find(
      (
        despacho
      ) => {
        const nDesp = despacho.nombre
          .toLowerCase()
          .normalize(
            'NFD'
          )
          .replace(
            /\p{Diacritic}/gu, ''
          )
          .trim();

        const pDesp = proceso.despacho
          .toLowerCase()
          .normalize(
            'NFD'
          )
          .replace(
            /\p{Diacritic}/gu, ''
          )
          .trim();

        const indexOfDesp = nDesp.indexOf(
          pDesp
        );

        if ( indexOfDesp >= 0 ) {
          console.log(
            `procesos despacho is in despachos ${ indexOfDesp }`
          );
        }

        return nDesp === pDesp;
      }
    );

    const nameN = matchedDespacho
      ? matchedDespacho.nombre
      : proceso.despacho;

    const matchedId = nameN.match(
      /\d+/g
    );

    const newId = Number(
      matchedId?.toString()
    );

    const newJuzgado: intJuzgado = {
      id  : newId ?? 0,
      tipo: matchedDespacho
        ? matchedDespacho.nombre
        : proceso.despacho,
      url: matchedDespacho
        ? `https://www.ramajudicial.gov.co${ matchedDespacho.url }`
        : `https://www.ramajudicial.gov.co${ proceso.despacho
          .replaceAll(
            ' ', '-'
          )
          .toLowerCase() }`,
    };
    juzgados.set(
      indexOf, newJuzgado
    );
  }

  return Array.from(
    juzgados.values()
  );
}



export async function fetchProceso(
  llaveProceso: string, index: number
) {
  try {
    await sleep(
      index
    );

    const req = await fetch(
      `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Carpetas/Expediente/Consulta/NumeroRadicacion?numero=${ llaveProceso }&SoloActivos=true`,
      {
        next: {
          revalidate: 864000,
          tags      : [
            'procesos'
          ],
        },
      },
    );

    if ( !req.ok ) {
      const json = ( await req.json() ) as ConsultaNumeroRadicacion;
      return json;
    }

    const json = ( await req.json() ) as Data;

    const responseReturn: ConsultaNumeroRadicacion = {
      StatusCode: req.status,
      Message   : req.statusText as Message,
      procesos  : json.procesos
    };

    return responseReturn;
  } catch ( e ) {
    if ( e instanceof Error ) {
      console.log(
        `${ index }: ${ llaveProceso }: error en la conexion network del fetchProceso ${ e.name } : ${ e.message }`,
      );

      return {
        StatusCode: index,
        Message   : `${ e.name }: ${ e.message }`
      };
    }

    console.log(
      `${ index }: ${ llaveProceso }: : error en la conexion network del fetchProceso  =>  ${ e }`,
    );

    return {
      StatusCode: index,
      Message   : JSON.stringify(
        e, null, 2
      )
    };
  }
}

export const getProceso = cache(
  async (
    {
      llaveProceso, index
    }: { llaveProceso: string; index: number }
  ) => {
    const carpColl = await carpetasCollection();

    const fetchP = await fetchProceso(
      llaveProceso, index
    );

    if ( fetchP ) {
      const {
        procesos
      } = fetchP;

      if ( procesos ) {
        for ( const proceso of procesos ) {
          const {
            idProceso, departamento, llaveProceso, sujetosProcesales, esPrivado, despacho
          } = proceso;

          if ( esPrivado ) {
            continue;
          }

          const juzgados = await newJuzgado(
            procesos
          );

          const updt = await carpColl.updateOne(
            {
              llaveProceso: llaveProceso,
            },
            {
              $addToSet: {
                idProcesos: idProceso,
                procesos  : proceso
              },
              $set: {
                'demanda.juzgados'         : juzgados,
                'demanda.departamento'     : departamento,
                'demanda.expediente'       : llaveProceso,
                'demanda.sujetosProcesales': sujetosProcesales,
                'demanda.despacho'         : despacho
              },
            },
            {
              upsert: false,
            },
          );

          if ( updt.modifiedCount > 0 || updt.upsertedCount > 0 ) {
            console.log(
              ` se actualizaron ${ updt.modifiedCount } procesos y se insertaron ${ updt.upsertedCount } procesosn nuevos  `,
            );
          }
        }
      }
    }

    return fetchP;
  }
);
