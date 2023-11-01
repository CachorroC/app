import { cache } from 'react';
import  { carpetasCollection } from '#@/lib/connection/mongodb';
import { sleep } from 'project/helper';
import { intJuzgado } from 'types/carpetas';
import { Despacho } from 'types/despachos';
import { intProceso, ConsultaNumeroRadicacion, Data, Message } from 'types/procesos';

export const getDespachos = cache(
  async () => {
    try {
      const request = await fetch(
        'https://app.rsasesorjuridico.com/despachos.json'
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
  proceso: intProceso
) {

  const Despachos = await getDespachos();


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
      : `https://www.ramajudicial.gov.co${ proceso.despacho.replaceAll(
        ' ', '-'
      )
        .toLowerCase() }`,
  };

  return newJuzgado;

}



export async function fetchProceso(
  llaveProceso: string, index: number
) {
  try {
    await sleep(
      index
    );

    const req = await fetch(
      `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Procesos/Consulta/NumeroRadicacion?numero=${ llaveProceso }&SoloActivos=false&pagina=1`

    );

    if ( !req.ok ) {
      const jsonError = ( await req.json() ) as ConsultaNumeroRadicacion;
      return jsonError;
    }

    const json = ( await req.json() ) as Data;

    const {
      procesos
    } = json;

    await updateProcesos(
      procesos
    );

    const responseReturn: ConsultaNumeroRadicacion = {
      StatusCode: req.status,
      Message   : req.statusText as Message,
      procesos  : procesos
    };

    return responseReturn;
  } catch ( e ) {
    if ( e instanceof Error ) {
      console.log(
        `Expediente: ${ llaveProceso }: error en la conexion network del fetchProceso ${ e.name } : ${ e.message }`,
      );

    }

    console.log(
      `Expediente: ${ llaveProceso }: : error en la conexion network del fetchProceso  =>  ${ e }`,
    );

    return {
      StatusCode: 404,
      Message   : JSON.stringify(
        e
      ) as Message
    };
  }
}

export const getProceso = cache(
  async(
    {
      llaveProceso, index
    }:
  {  llaveProceso: string, index: number}
  ) => {
    try {
      const fetchP = await fetchProceso(
        llaveProceso, index
      );


      if ( !fetchP.procesos || fetchP.procesos.length === 0 ) {
        return null;
      }

      const {
        procesos
      } = fetchP;

      return procesos;


    } catch ( error ) {
      console.log(
        `error en getProcesos ${ JSON.stringify(
          error, null, 2
        )
        }`
      );
      return null;
    }
  }
);


export async function updateProcesos(
  procesos: intProceso[]
) {
  try {
    if ( procesos.length === 0 ) {
      throw new Error(
        'no hay procesos en el array updateProcesos'
      );
    }


    for ( const proceso of procesos ) {
      const {
        llaveProceso, idProceso, esPrivado, departamento, sujetosProcesales, despacho
      } = proceso;

      if ( esPrivado ) {
        console.log(
          'el proceso es privado'
        );
        continue;
      }


      const carpetasColl = await carpetasCollection();

      const juzgado = await newJuzgado(
        proceso
      );

      const updateProceso = await carpetasColl.updateOne(
        {
          $or: [
            {
              llaveProceso: llaveProceso
            },
            {
              idProcesos: idProceso

            }
          ]
        }, {
          $addToSet: {
            idProcesos        : idProceso,
            procesos          : proceso,
            'demanda.juzgados': juzgado
          },
          $set: {
            'demanda.departamento'     : departamento,
            'demanda.expediente'       : llaveProceso,
            'demanda.sujetosProcesales': sujetosProcesales,
            'demanda.despacho'         : despacho
          },
        }, {
          upsert: false
        }
      );

      if ( updateProceso.modifiedCount > 0 || updateProceso.matchedCount > 0 ) {
        console.log(
          `Procesos:
          - se actualizaron ${ updateProceso.modifiedCount } procesos
          - se insertaron ${ updateProceso.upsertedCount } procesosn nuevos;
          - matchedCount : ${ updateProceso.matchedCount }`
        );
        continue;
      }

      continue;
    }

    return;
  } catch ( error ) {
    console.log(
      `error en updateProcesos ${    JSON.stringify(
        error, null, 2
      ) }`
    );
  }

}
