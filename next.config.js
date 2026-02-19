/** @type {import('next').NextConfig} */

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production'
  : process.env.NODE_ENV === 'staging'
  ? '.env.staging'
  : '.env.development';

const nextConfig = {
  reactStrictMode: true,
  
  // Environment variables configuration
  env: {
    // These are only available on the server-side
    DATABASE_URL: process.env.DATABASE_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  
  // Public runtime environment variables
  publicRuntimeConfig: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
    STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  
  // Image optimization
  images: {
    domains: ['example.com'],
  },
};

module.exports = nextConfig;
