# Multi-Environment NextJS with Secrets Management

A comprehensive Next.js project demonstrating best practices for environment-aware builds and secure secrets management across development, staging, and production environments.

## 🎯 Overview

This project implements a production-ready pattern for managing environments and secrets in a Next.js application, ensuring sensitive data is never exposed in version control while maintaining consistent, reproducible builds across all environments.

## 📁 Project Structure

```
.
├── .env.development          # Development environment variables
├── .env.staging              # Staging environment variables
├── .env.production           # Production environment variables
├── .env.example              # Template tracked in git
├── .env.local               # Local overrides (NOT tracked in git)
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions CI/CD pipeline
├── app/
│   └── page.jsx             # Main application page
├── lib/
│   └── config.js            # Configuration utility
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies & scripts
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs-env-aware-builds
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create local environment file**
   ```bash
   # Copy the template
   cp .env.example .env.local
   
   # Edit with your local values
   nano .env.local
   ```

## 🔧 Environment Configuration

### Environment Files

This project uses three main environment files:

#### `.env.development` (Development)
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=postgres://dev_user:dev_pass@localhost:5432/dev_db
NEXT_PUBLIC_LOG_LEVEL=debug
```

#### `.env.staging` (Staging)
```
NEXT_PUBLIC_API_URL=https://staging-api.example.com
DATABASE_URL=postgres://staging_user:staging_pass@staging-db.aws.amazon.com:5432/staging_db
NEXT_PUBLIC_LOG_LEVEL=info
```

#### `.env.production` (Production)
```
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=$(DATABASE_URL_PRODUCTION)
NEXT_PUBLIC_LOG_LEVEL=error
```

### Environment Variable Types

- **`NEXT_PUBLIC_*`**: Publicly exposed variables (visible in browser). Use ONLY for non-sensitive data.
- **Other variables**: Server-side only, secure from client exposure.

## 🏗️ Build Scripts

The project includes environment-specific build commands:

```bash
# Development Build
npm run build:development

# Staging Build
npm run build:staging

# Production Build
npm run build:production

# Development Server
npm run dev

# Start Production Server
npm start

# Linting
npm run lint
```

### Build Process

When running a build:
1. The correct `.env.[environment]` file is loaded
2. Environment variables are injected at build time
3. Output is optimized for that specific environment
4. Build artifacts are generated in `.next/` directory

**Example:**
```bash
NODE_ENV=production npm run build:production
# Loads .env.production and creates production-optimized build
```

## 🔐 Secrets Management

### Local Development

For development, store local secrets in `.env.local`:
```bash
# .env.local (NOT tracked in git)
STRIPE_SECRET_KEY=sk_test_your_actual_key
JWT_SECRET=your_development_jwt_secret
```

**⚠️ IMPORTANT**: `.env.local` is in `.gitignore` - it will never be committed.

### GitHub Secrets (Recommended for CI/CD)

For automated deployments, store secrets in GitHub Secrets:

1. **Navigate to** Repository Settings → Secrets and Variables → Actions
2. **Create secrets** for each environment:

   **Development Secrets:**
   - `API_URL_DEVELOPMENT`
   - `DATABASE_URL_DEVELOPMENT`
   - `STRIPE_SECRET_KEY_DEVELOPMENT`
   - `JWT_SECRET_DEVELOPMENT`

   **Staging Secrets:**
   - `API_URL_STAGING`
   - `DATABASE_URL_STAGING`
   - `STRIPE_SECRET_KEY_STAGING`
   - `JWT_SECRET_STAGING`

   **Production Secrets:**
   - `API_URL_PRODUCTION`
   - `DATABASE_URL_PRODUCTION`
   - `STRIPE_SECRET_KEY_PRODUCTION`
   - `JWT_SECRET_PRODUCTION`
   - `STRIPE_PUBLISHABLE_KEY_PRODUCTION`

3. **Reference in CI/CD:**
   ```yaml
   env:
     DATABASE_URL: ${{ secrets.DATABASE_URL_PRODUCTION }}
     STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY_PRODUCTION }}
   ```

### Alternative: Cloud Key Vaults

#### AWS Secrets Manager
```bash
# Store secrets
aws secretsmanager create-secret \
  --name prod/database-url \
  --secret-string "postgres://user:pass@host/db"

# Retrieve in CI/CD
export DB_URL=$(aws secretsmanager get-secret-value \
  --secret-id prod/database-url \
  --query SecretString)
```

#### Azure Key Vault
```bash
# Store secrets
az keyvault secret set \
  --vault-name mykeyvault \
  --name DatabaseUrl \
  --value "postgres://user:pass@host/db"

# Retrieve in CI/CD
export DB_URL=$(az keyvault secret show \
  --vault-name mykeyvault \
  --name DatabaseUrl \
  --query value)
```

## 🔄 CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. **Triggers on:**
   - Pushes to `main`, `develop`, or `staging` branches

2. **For each environment:**
   - Checks out code
   - Installs dependencies
   - Creates environment file from GitHub Secrets
   - Builds for that environment
   - Runs security scans
   - Uploads build artifacts

3. **Security Features:**
   - Detects hardcoded secrets
   - Verifies `.gitignore` configuration
   - Validates environment variables

### Running the Pipeline

The workflow runs automatically on push. To manually trigger:

```bash
# Push to trigger workflow
git push origin main

# View workflow status in GitHub Actions tab
```

## ✅ Security Best Practices Implemented

### ✓ No Secrets in Repository
- All `.env.*` files (except `.env.example`) are in `.gitignore`
- Secrets are stored in GitHub Secrets or cloud vaults
- `.env.local` for local development overrides

### ✓ Environment Isolation
- Separate configuration per environment
- Build-time variable injection prevents runtime leaks
- Different API endpoints and databases per environment

### ✓ Public/Private Variable Separation
- Only `NEXT_PUBLIC_*` variables exposed to browser
- Server-side secrets remain private
- Clear naming convention prevents accidents

### ✓ Build Verification
- Unique builds for each environment
- Build artifacts tracked and verified
- No cross-environment contamination

### ✓ CI/CD Integration
- Secrets accessed only in GitHub Actions
- No credentials in workflow files
- Automated security scans for exposed secrets

## 📊 How Environments Differ

| Aspect | Development | Staging | Production |
|--------|-------------|---------|-----------|
| **API URL** | `http://localhost:3000/api` | `https://staging-api.example.com` | `https://api.example.com` |
| **Database** | Local PostgreSQL | AWS RDS (staging) | AWS RDS (production) |
| **Log Level** | `debug` | `info` | `error` |
| **Beta Features** | ✓ Enabled | ✓ Enabled | ✗ Disabled |
| **Analytics** | ✗ Disabled | ✓ Enabled | ✓ Enabled |
| **Stripe Keys** | Test keys | Test keys | Live keys |

## 🧪 Testing the Setup

### Verify Environment Variables are Injected

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Open browser:** `http://localhost:3000`

3. **Check the displayed environment configuration**
   - Should show `development` as the environment
   - API URL should match your `.env.development`

### Test Different Builds

```bash
# Build for staging
npm run build:staging

# Check generated .next configuration
grep -r "staging-api" .next/

# Build for production
npm run build:production

# Build artifacts are environment-specific
```

### Verify .gitignore

```bash
# Confirm .env files are ignored
git status
# Should NOT show .env.development, .env.staging, .env.production

# But .env.example should be tracked
git ls-files | grep env
# Should show: .env.example
```

## 🚨 Common Issues & Solutions

### Issue: Variables not loading
**Solution:** Verify `.env.[environment]` file exists in root directory and `NODE_ENV` is set correctly.

```bash
NODE_ENV=production npm run build:production
```

### Issue: Secrets not available in GitHub Actions
**Solution:** Ensure GitHub Secrets are created with correct names in repository settings.

```bash
# Format: VARIABLE_NAME_ENVIRONMENT
API_URL_PRODUCTION
DATABASE_URL_STAGING
```

### Issue: Empty API URL in browser
**Solution:** Remember to prefix with `NEXT_PUBLIC_` to expose to client.

```javascript
// ✓ Correct - will be available in browser
NEXT_PUBLIC_API_URL=https://api.example.com

// ✗ Wrong - won't be available in browser
API_URL=https://api.example.com
```

### Issue: Building wrong environment
**Solution:** Explicitly set `NODE_ENV` before build.

```bash
# Wrong
npm run build  # Uses .env.development

# Correct
NODE_ENV=production npm run build:production
```

## 📚 Additional Resources

- [Next.js Environment Variables Documentation](https://nextjs.org/docs/basic-features/environment-variables)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/)
- [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/)

## 🎓 Why This Matters for Production

1. **Reliability:** Guaranteed consistent builds across environments
2. **Security:** Secrets never exposed in version control
3. **Scalability:** Easy to add new environments or modify configurations
4. **Compliance:** Meets enterprise security standards
5. **Debugging:** Clear separation makes issues easier to trace
6. **Team Collaboration:** Developers work with example configs, not real secrets

## 📝 Challenges & Solutions

### Challenge 1: Managing Multiple Secrets
**Solution:** Use GitHub Secrets with consistent naming convention:
```
{VARIABLE}_{ENVIRONMENT}
```

### Challenge 2: Local Development with Real Secrets
**Solution:** Use `.env.local` (not tracked) for local overrides:
```bash
# .env.local
STRIPE_SECRET_KEY=sk_test_your_real_test_key
```

### Challenge 3: Different API Endpoints per Environment
**Solution:** Use `NEXT_PUBLIC_API_URL` to switch endpoints:
```javascript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// Different for each environment
```

### Challenge 4: Preventing Accidental Production Deployments
**Solution:** Use GitHub branch protection rules and environment-specific deployments:
```yaml
environment: production  # Requires additional approval
```

## 🤝 Contributing

When adding new environment variables:

1. Add to `.env.example` with placeholder
2. Add to each `.env.[environment]` file
3. Create GitHub Secrets for CI/CD
4. Document in this README
5. Test in all environments

## 📄 License

MIT

---

**Remember:** Never commit `.env` files, always use `.env.example` as a reference template!
