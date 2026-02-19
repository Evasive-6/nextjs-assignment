# GitHub Copilot Instructions for Multi-Environment NextJS Project

This project demonstrates environment-aware builds and secure secrets management.

## Project Overview

- **Technology:** Next.js 15+ with React 19
- **Environments:** Development, Staging, Production
- **Secrets Management:** GitHub Secrets, AWS Parameter Store, Azure Key Vault
- **CI/CD:** GitHub Actions workflow

## Key Components

1. **Environment Configuration Files**
   - `.env.development` - Development settings
   - `.env.staging` - Staging settings
   - `.env.production` - Production settings
   - `.env.example` - Tracked template (no real secrets)
   - `.env.local` - Local overrides (not tracked)

2. **Build Scripts** (package.json)
   - `npm run build:development` - Build for dev
   - `npm run build:staging` - Build for staging
   - `npm run build:production` - Build for production
   - `npm run dev` - Development server

3. **GitHub Actions** (`.github/workflows/deploy.yml`)
   - Multi-environment CI/CD pipeline
   - Automatic secret injection
   - Security scanning
   - Artifact management

4. **Documentation**
   - `README.md` - Complete project guide
   - `GITHUB_SECRETS_SETUP.md` - Secrets configuration guide

## Important Rules

### Security
- ✓ Never commit `.env` files with real secrets
- ✓ Use `.env.example` as template only
- ✓ Store secrets in GitHub Secrets or cloud vaults
- ✓ Use `NEXT_PUBLIC_*` only for non-sensitive public data
- ✓ Never log or print secret values

### Development
- Use `npm install` to install dependencies
- Use `.env.local` for local overrides
- Prefix public variables with `NEXT_PUBLIC_`
- Document new environment variables in `.env.example`

### When Adding Features
1. Add to `.env.example` with placeholder
2. Add to each `.env.[environment]` file
3. Create GitHub Secrets if needed
4. Update documentation
5. Test in all environments

## Common Commands

```bash
# Installation
npm install

# Development
npm run dev

# Build for specific environment
NODE_ENV=production npm run build:production

# Linting
npm run lint

# Verify environment setup
cat .env.local
```

## Environment Variable Priority

1. `.env.local` (highest priority - local overrides)
2. `.env.[NODE_ENV]` (environment-specific)
3. `.env` (general - if exists)
4. `.env.example` (reference only)
5. Defaults in code (lowest priority)
