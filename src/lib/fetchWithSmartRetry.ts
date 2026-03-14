/* eslint-disable no-undef */
import { sleep } from './project/helper';


const browserHeaders = {
  'User-Agent'             : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept'                 : 'application/json, text/plain, */*',
  'Accept-Language'        : 'es-CO,es-419;q=0.9,es;q=0.8,en;q=0.7', // Prioritize Colombian Spanish
  'Accept-Encoding'        : 'gzip, deflate, br',
  'Connection'             : 'keep-alive',
  // Some firewalls check these modern "Sec-" headers
  'Sec-Ch-Ua'              : '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
  'Sec-Ch-Ua-Mobile'       : '?0',
  'Sec-Ch-Ua-Platform'     : '"Windows"',
  'Sec-Fetch-Dest'         : 'empty',
  'Sec-Fetch-Mode'         : 'cors',
  'Sec-Fetch-Site'         : 'same-site',
  // Government APIs often require a Referer to prove you came from their frontend
  //'Referer'                : 'https://consultaprocesos.ramajudicial.gov.co/',
  'CF-Access-Client-Id'    : `${ process.env.NEXT_PUBLIC_CF_ACCESS_CLIENT_ID }`,
  'CF-Access-Client-Secret': `${ process.env.NEXT_PUBLIC_CF_ACCESS_CLIENT_SECRET }`,

};



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
    '/{id}',
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

export async function fetchWithSmartRetryNoRateLimit(
  url: string | URL,
  options: RequestInit = {},
  maxRetries = 7,
  baseDelay = 8000,
): Promise<Response> {
  let attempt = 0;
  console.log( `fetching ${ url }` );

  while ( attempt <= maxRetries ) {
    try {
      // 🛡️ Proactive Rate Limiting (Now applies to retries too)

      const response = await fetch(
        url, {
          ...options,
          headers: {
            ...browserHeaders,
            ...options.headers
          }
        }
      );

      if ( response.ok ) {
        return response;
      }

      console.log( `response text: ${ response.statusText }` );

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
            delay = parsedSeconds * 1000 + 1000;
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

        console.warn( `⏳ [429] Route limit hit for ${ getRateLimitKey( url ) }. Pausing for ${ delay }ms...`, );
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
      const errorMessage
        = error instanceof Error
          ? error.message
          : String( error );

      console.error( `📡 [Network Error] ${ errorMessage }. Retrying in ${ delay }ms...`, );
      await sleep( delay );
      attempt++;
    }
  }

  throw new Error( 'Unexpected end of fetch retry loop' );
}


export async function fetchWithSmartRetry(
  url: string | URL,
  options: RequestInit = {},
  maxRetries = 7,
  baseDelay = 8000,
): Promise<Response> {
  let attempt = 0;

  while ( attempt <= maxRetries ) {
    try {
      // 🛡️ Proactive Rate Limiting (Now applies to retries too)
      await enforceRateLimit( url );
      const response = await fetch(
        url, {
          ...options,
          headers: {
            ...browserHeaders,
            ...options.headers
          }
        }
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
            delay = parsedSeconds * 1000 + 1000;
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

        console.warn( `⏳ [429] Route limit hit for ${ getRateLimitKey( url ) }. Pausing for ${ delay }ms...`, );
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
      const errorMessage
        = error instanceof Error
          ? error.message
          : String( error );

      console.error( `📡 [Network Error] ${ errorMessage }. Retrying in ${ delay }ms...`, );
      await sleep( delay );
      attempt++;
    }
  }

  throw new Error( 'Unexpected end of fetch retry loop' );
}
