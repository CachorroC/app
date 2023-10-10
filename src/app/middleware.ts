import { NextResponse, type NextRequest } from 'next/server';

export function middleware(
  request: NextRequest 
) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(
    request.headers 
  );
  requestHeaders.set(
    'CF-Access-Client-Id',
    'cf201fe17e20c53ebe25105be3145e48.access',
  );
  requestHeaders.set(
    'CF-Access-Client-Secret',
    '424d06db7160c5449c6e756eb2296cfe4291137bb2bed87d5c839f843adab1f1',
  );

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next(
    {
      request: {
      // New request headers
        headers: requestHeaders,
      },
    } 
  );

  return response;
}
