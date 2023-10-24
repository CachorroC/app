import { cache } from 'react';
import  { carpetasCollection } from '#@/lib/connection/mongodb';
import { sleep } from '#@/lib/project/helper';
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
  llaveProceso: string
) {
  try {
    const req = await fetch(
      `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Procesos/Consulta/NumeroRadicacion?numero=${ llaveProceso }&SoloActivos=false&pagina=1`, {
        cache: 'force-cache'
      }

    );

    if ( !req.ok ) {
      const jsonError = ( await req.json() ) as ConsultaNumeroRadicacion;
      return jsonError;
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
        `Expediente: ${ llaveProceso }: error en la conexion network del fetchProceso ${ e.name } : ${ e.message }`,
      );

      return {
        StatusCode: 404,
        Message   : `${ e.name }: ${ e.message }`
      };
    }

    console.log(
      `Expediente: ${ llaveProceso }: : error en la conexion network del fetchProceso  =>  ${ e }`,
    );

    return {
      StatusCode: 404,
      Message   : JSON.stringify(
        e, null, 2
      )
    };
  }
}

export async function getProceso(
  llaveProceso: string, index?: number
) {
  try {

    await sleep(
      index ?? 1000
    );

    const fetchP = await fetchProceso(
      llaveProceso
    );

    const {
      procesos
    } = fetchP;

    if ( !procesos || procesos.length === 0 ) {
      throw new Error(
        `${ !procesos
          ? 'no hay procesos'
          : `el length de procesos es: ${ procesos.length }` }`
      );

    }

    const carpColl = await carpetasCollection();



    for ( const proceso of procesos ) {
      const {
        idProceso, departamento, llaveProceso, sujetosProcesales, esPrivado, despacho
      } = proceso;

      if ( esPrivado ) {
        continue;
      }

      const juzgado = await newJuzgado(
        proceso
      );

      const updt = await carpColl.updateOne(
        {
          llaveProceso: llaveProceso,
        },
        {
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
        },
        {
          upsert: false,
        },
      );

      if ( updt.modifiedCount > 0 || updt.upsertedCount > 0 ) {
        console.log(
          `Procesos:
          - se actualizaron ${ updt.modifiedCount } procesos
          - se insertaron ${ updt.upsertedCount } procesosn nuevos;
          - matchedCount : ${ updt.matchedCount }`,
        );
        continue;
      }

      continue;
    }

    return procesos;


  } catch ( error ) {
    console.log(
      JSON.stringify(
        error, null, 2
      )
    );
    return [];
  }
}


export const updateProcesos = cache(
  async (
    procesos: intProceso[]  
  ) => {
    try {
      if ( procesos.length === 0 ) {
        throw new Error(
          'no hay procesos en el array updateProcesos'
        );
      }

      const carpetasColl = await carpetasCollection();

      for ( const proceso of procesos ) {
        if ( proceso.esPrivado ) {
          console.log(
            'el proceso es privado'
          );
          continue;
        }

        const juzgado = await newJuzgado(
          proceso
        );

        const updateProceso = await carpetasColl.updateMany(
          {
            llaveProceso: proceso.llaveProceso
          }, {
            $addToSet: {
              idProcesos        : proceso.idProceso,
              'demanda.procesos': proceso,
              'demanda.juzgados': juzgado
            },
            $set: {
              'demanda.departamento'     : proceso.departamento,
              'demanda.expediente'       : proceso.llaveProceso,
              'demanda.sujetosProcesales': proceso.sujetosProcesales,
              'demanda.despacho'         : proceso.despacho
            },
          }
        );

        if ( updateProceso.matchedCount > 0 ) {
          console.log(
            `Procesos:
          - se actualizaron ${ updateProceso.modifiedCount } procesos
          - se insertaron ${ updateProceso.upsertedCount } procesosn nuevos;
          - matchedCount : ${ updateProceso.matchedCount }`
          );
        }

        continue;
      }

      return;
    } catch ( error ) {
      console.log(
        JSON.stringify(
          error, null, 2
        )
      );
    }

  }
);