// app/api/health/route.js
// Example API route showing environment variable usage

export async function GET(request) {
  const environment = process.env.NODE_ENV || 'development';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // Server-side secrets are accessible here but NOT sent to client
  const hasStripeSecret = !!process.env.STRIPE_SECRET_KEY;
  const hasJwtSecret = !!process.env.JWT_SECRET;
  
  return Response.json({
    status: 'healthy',
    environment,
    apiUrl,
    timestamp: new Date().toISOString(),
    secretsConfigured: {
      stripe: hasStripeSecret,
      jwt: hasJwtSecret,
    },
    // Never expose actual secret values!
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
