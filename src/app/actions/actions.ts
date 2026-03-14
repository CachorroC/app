'use server';

import { intDemanda } from '#@/lib/types/carpetas';

export async function updateDemandaAction(
  prevState: { success: boolean; demanda: intDemanda | null },
  queryData: FormData,
) {
  const itemID = queryData.get( 'numero' );

  const {
    demanda
  } = prevState;

  if ( demanda === null ) {
    return {
      demanda: null,
      success: true,
    };
  }

  if ( itemID && demanda ) {
    return {
      demanda: {
        ...demanda,
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
