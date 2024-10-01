'use server';

import { intDemanda } from '#@/lib/types/carpetas';



export async function updateDemandaAction(
  prevState: { success: boolean; demanda: intDemanda },
  queryData: FormData,
) {
  const itemID = queryData.get( 'numero' );

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





let subscription: PushSubscription | null = null;

export async function subscribeUser( sub: PushSubscription ) {
  subscription = sub;

  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  return {
    success: true
  };
}

export async function unsubscribeUser() {
  subscription = null;

  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return {
    success: true
  };
}

export async function sendNotification( message: string ) {
  if ( !subscription ) {
    throw new Error( 'No subscription available' );
  }

  try {
    await Notification.requestPermission();
    new Notification( message );


    return {
      success: true
    };
  } catch ( error ) {
    console.error(
      'Error sending push notification:', error
    );

    return {
      success: false,
      error  : 'Failed to send notification'
    };
  }
}