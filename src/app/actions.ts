'use server';

import { intDemanda } from '#@/lib/types/carpetas';

export async function updateDemandaAction(
  prevState: { success: boolean; demanda: intDemanda },
  queryData: FormData,
) {
  const itemID = queryData.get(
    'numero' 
  );

  if ( itemID ) {
    return {
      demanda: {
        ...prevState.demanda,
      },
      success: true,
    };
  }

  return {
    success: false,
    demanda: {
      ...prevState.demanda,
    },
  };
}
