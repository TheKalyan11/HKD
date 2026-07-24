import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory store for rate limiting (isolated per Edge worker)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Config
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100; // 100 requests per minute

export function middleware(request: NextRequest) {
  // Only rate limit specific high-risk paths, or exclude static files
  const path = request.nextUrl.pathname;
  
  // Skip rate limiting for static assets, images, and Next.js internal routes
  if (
    path.startsWith('/_next') ||
    path.startsWith('/favicon.ico') ||
    path.match(/\.(png|jpg|jpeg|gif|webp|svg|mp4|webm|avif|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Get the client's IP address
  const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
  
  const now = Date.now();
  const windowData = rateLimitMap.get(ip);

  if (!windowData || now > windowData.resetTime) {
    // First request or window expired
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
  } else {
    // Within the window
    if (windowData.count >= MAX_REQUESTS_PER_WINDOW) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((windowData.resetTime - now) / 1000).toString(),
          },
        }
      );
    }
    
    // Increment counter
    windowData.count++;
    rateLimitMap.set(ip, windowData);
  }

  // Optional: Clean up old entries occasionally to prevent memory leaks in the Map
  if (Math.random() < 0.01) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except api, _next/static, _next/image, favicon.ico
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
