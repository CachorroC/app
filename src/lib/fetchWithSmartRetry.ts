import { sleep } from './project/helper';

// 60,000ms / 5 requests = 12,000ms required gap between requests
const RATE_LIMIT_DELAY_MS = 12000;

// A global lock to sequence requests
let requestQueue = Promise.resolve();

/**
 * Forces requests to queue up and execute with a mandated delay.
 */
// Explicitly define as Promise<void>

async function enforceRateLimit() {
  const currentWait = requestQueue;

  // Make the callback async and await sleep, which forces it to return Promise<void>
  requestQueue = requestQueue.then( async () => {
    await sleep( RATE_LIMIT_DELAY_MS );
  } );

  await currentWait;
}

// Wrapper for fetch with retries
export async function fetchWithSmartRetry(
  url: string | URL,
  options: RequestInit = {},
  maxRetries = 5,
  baseDelay = 4000,
): Promise<Response> {
  const totalAttempts = maxRetries + 1;
  let attempt = 1;

  while ( attempt <= totalAttempts ) {
    if ( attempt > 1 ) {
      console.log( `🔄 fetchWithSmartRetry Attempt ${ attempt } for ${ url }` );
    }

    try {
      // --- PROACTIVE RATE LIMITING ---
      // Wait for the global queue before executing the fetch
      await enforceRateLimit();

      const response = await fetch(
        url, options
      );

      // --- HANDLE 429 (RATE LIMITS) ---
      if ( response.status === 429 ) {
        const retryAfterHeader = response.headers.get( 'retry-after' );
        const waitTime = retryAfterHeader
          ? ( parseInt(
              retryAfterHeader, 10
            ) * 1000 ) + 1000
          : baseDelay * Math.pow(
            2, attempt
          );

        console.log( `⚠️ [429 Too Many Requests] Pausing for ${ waitTime }ms...` );
        await sleep( waitTime );
        attempt++;

        continue;
      }

      if ( response.status === 403 ) {
        await sleep( 2000 );
        attempt++;
        console.log( response.statusText );

        continue;
      }

      // Check for server errors
      if ( [
        500,
        502,
        503,
        504
      ].includes( response.status ) ) {
        throw new Error( `🚫 failed request: fetchWithSmartRetry: ${ url } statusCode<500 Server Status ${ response.status }` );
      }

      return response;

    } catch ( error ) {
      if ( attempt >= totalAttempts ) {
        throw error;
      }

      const delay = ( baseDelay * attempt );
      console.log( `⚠️ [Retry] Attempt ${ attempt }/${ totalAttempts } failed for ${ url }. Retrying in ${ delay }ms...` );
      await sleep( delay );
      attempt++;

      continue;
    }
  }

  throw new Error( `🚫 failed request: fetchWithSmartRetry: ${ url } fetchWithSmartRetry failed unexpectedly` );
}