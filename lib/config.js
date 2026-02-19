// lib/config.js
// This file loads and validates environment configuration

export const getConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  
  const config = {
    development: {
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
      environment: 'development',
      logLevel: 'debug',
      databaseUrl: process.env.DATABASE_URL,
      stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      featureBeta: true,
      analyticsEnabled: false,
    },
    staging: {
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://staging-api.example.com',
      environment: 'staging',
      logLevel: 'info',
      databaseUrl: process.env.DATABASE_URL,
      stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      featureBeta: true,
      analyticsEnabled: true,
    },
    production: {
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
      environment: 'production',
      logLevel: 'error',
      databaseUrl: process.env.DATABASE_URL,
      stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      featureBeta: false,
      analyticsEnabled: true,
    },
  };

  return config[env] || config.development;
};

// Validate that critical environment variables are set
export const validateEnvironment = () => {
  const required = ['NEXT_PUBLIC_API_URL'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
  }
};
