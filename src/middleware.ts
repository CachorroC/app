import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(
  request: NextRequest
) {
      const url = request.nextUrl;

      const {
        device
      } = userAgent(
        request
      );

      const viewport = device.type ?? 'no type';
      url.searchParams.set(
        'viewport', viewport
      );
      return NextResponse.rewrite(
        url
      );
}