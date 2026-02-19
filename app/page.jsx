'use client';

import { useEffect, useState } from 'react';
import getConfig from 'next/config';

export default function Home() {
  const { publicRuntimeConfig } = getConfig();
  const [environment, setEnvironment] = useState(null);

  useEffect(() => {
    setEnvironment(publicRuntimeConfig?.ENVIRONMENT);
  }, [publicRuntimeConfig]);

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 Multi-Environment Build Demo</h1>
      
      <section style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h2>Environment Configuration</h2>
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Environment:</strong> <span style={{ color: '#0070f3' }}>{environment || 'Loading...'}</span></p>
          <p><strong>API URL:</strong> {publicRuntimeConfig?.API_URL}</p>
          <p><strong>Log Level:</strong> {publicRuntimeConfig?.LOG_LEVEL}</p>
          <p><strong>Analytics Enabled:</strong> {publicRuntimeConfig?.ENABLE_ANALYTICS ? 'Yes' : 'No'}</p>
        </div>
      </section>

      <section style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h2>✅ What This Setup Demonstrates</h2>
        <ul>
          <li>Environment-specific configuration files (.env.development, .env.staging, .env.production)</li>
          <li>Build-time environment variable injection</li>
          <li>Public vs Private environment variables</li>
          <li>GitHub Secrets integration pattern</li>
          <li>CI/CD pipeline support</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fff9e6', borderRadius: '8px', borderLeft: '4px solid #ffa500' }}>
        <h2>🔐 Security Best Practices Implemented</h2>
        <ul>
          <li>✓ .env files NOT committed to version control</li>
          <li>✓ .env.example kept as reference template</li>
          <li>✓ Secrets stored in GitHub Secrets (not in code)</li>
          <li>✓ Environment-specific builds to prevent configuration mistakes</li>
          <li>✓ NEXT_PUBLIC_ prefix used correctly for public variables only</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e6f3ff', borderRadius: '8px' }}>
        <h2>📝 How to Use</h2>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`# Development Build
npm run build:development

# Staging Build
npm run build:staging

# Production Build
npm run build:production

# Run Development Server
npm run dev`}
        </pre>
      </section>
    </main>
  );
}
