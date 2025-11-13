/**
 * CORS helper for Next.js API routes
 * Sets appropriate CORS headers for API responses
 */
export function setCorsHeaders(headers, origin = '*') {
  headers.set('Access-Control-Allow-Origin', origin);
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  headers.set('Access-Control-Max-Age', '86400'); // 24 hours
}

export function handleCors(request, response) {
  setCorsHeaders(response.headers);
}
