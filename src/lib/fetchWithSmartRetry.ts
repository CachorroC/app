import { sleep } from './project/helper';

const RATE_LIMIT_DELAY_MS = 13000;
const urlQueues = new Map<string, Promise<void>>();

export function getRateLimitKey( targetUrl: string | URL ): string {
  const urlObj = new URL( targetUrl.toString() );
  let path = urlObj.pathname;

  // 1. Replace numeric IDs
  path = path.replace(
    /\/\d+(?=\/|$)/g, '/{id}'
  );

  // 2. Replace UUIDs
  path = path.replace(
    /\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(?=\/|$)/g,
    '/{id}'
  );

  return `${ urlObj.hostname }${ path }`;
}

async function enforceRateLimit( url: string | URL ): Promise<void> {
  const routeKey = getRateLimitKey( url );
  const currentWait = urlQueues.get( routeKey ) || Promise.resolve();

  const nextWait = currentWait.then( async () => {
    await sleep( RATE_LIMIT_DELAY_MS ); // 🐛 FIXED: Changed 'wait' to 'sleep'

    if ( urlQueues.get( routeKey ) === nextWait ) {
      urlQueues.delete( routeKey );
    }
  } );

  urlQueues.set(
    routeKey, nextWait
  );
  await currentWait;
}

export async function fetchWithSmartRetry(
  url: string | URL,
  options: RequestInit = {},
  maxRetries = 7,
  baseDelay = 8000
): Promise<Response> {
  let attempt = 0;

  while ( attempt <= maxRetries ) {
    try {
      // 🛡️ Proactive Rate Limiting (Now applies to retries too)
      await enforceRateLimit( url );
      const response = await fetch(
        url, options
      );

      if ( response.ok ) {
        return response;
      }

      // 🛑 429 Too Many Requests
      if ( response.status === 429 ) {
        const retryAfter = response.headers.get( 'retry-after' );
        let delay = baseDelay * Math.pow(
          2, attempt
        );

        if ( retryAfter ) {
          const parsedSeconds = parseInt(
            retryAfter, 10
          );

          if ( !isNaN( parsedSeconds ) ) {
            delay = ( parsedSeconds * 1000 ) + 1000;
          } else {
            // Handle HTTP-date format
            const date = new Date( retryAfter )
              .getTime();

            if ( !isNaN( date ) ) {
              delay = Math.max(
                0, date - Date.now()
              ) + 1000;
            }
          }
        }

        console.warn( `⏳ [429] Route limit hit for ${ getRateLimitKey( url ) }. Pausing for ${ delay }ms...` );
        await sleep( delay );
        attempt++;

        continue;
      }

      const RECOVERABLE_STATUSES = [
        403,
        408,
        500,
        502,
        503,
        504
      ];

      if ( RECOVERABLE_STATUSES.includes( response.status ) ) {
        if ( attempt >= maxRetries ) {
          return response;
        }

        const delay = baseDelay * Math.pow(
          2, attempt
        );
        console.warn( `⚠️ [HTTP ${ response.status }] Retrying in ${ delay }ms...` );
        await sleep( delay );
        attempt++;

        continue;
      }

      // ❌ Fatal Client Errors (400, 401, 403, 404)
      return response;

    } catch ( error ) {
      // 📡 Network Errors
      if ( attempt >= maxRetries ) {
        throw error;
      }

      const delay = baseDelay * Math.pow(
        2, attempt
      );
      const errorMessage = error instanceof Error
        ? error.message
        : String( error );

      console.error( `📡 [Network Error] ${ errorMessage }. Retrying in ${ delay }ms...` );
      await sleep( delay );
      attempt++;
    }
  }

  throw new Error( 'Unexpected end of fetch retry loop' );
}