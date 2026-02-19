# GitHub Secrets Setup Guide

This document guides you through setting up GitHub Secrets for secure multi-environment deployments.

## Why GitHub Secrets?

- ✓ Encrypted storage for sensitive data
- ✓ Never exposed in logs or artifacts
- ✓ Access control per environment
- ✓ Audit trails for compliance
- ✓ Seamless CI/CD integration

## Step-by-Step Setup

### 1. Navigate to Repository Settings

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. In left sidebar, click **Secrets and variables** → **Actions**

### 2. Create Development Environment Secrets

Click **New repository secret** for each:

| Secret Name | Example Value | Purpose |
|------------|---------------|-----------| 
| `API_URL_DEVELOPMENT` | `http://localhost:3000/api` | Dev API endpoint |
| `DATABASE_URL_DEVELOPMENT` | `postgres://dev:pass@localhost:5432/dev_db` | Dev database |
| `STRIPE_SECRET_KEY_DEVELOPMENT` | `sk_test_XXXXXXXXXXXXX` | Stripe test key |
| `JWT_SECRET_DEVELOPMENT` | `dev-jwt-secret-key` | JWT signing secret |
| `STRIPE_PUBLISHABLE_KEY_DEVELOPMENT` | `pk_test_XXXXXXXXXXXXX` | Stripe public key |

### 3. Create Staging Environment Secrets

| Secret Name | Example Value | Purpose |
|------------|---------------|-----------| 
| `API_URL_STAGING` | `https://staging-api.example.com` | Staging API endpoint |
| `DATABASE_URL_STAGING` | `postgres://staging:pass@staging-db.aws.amazon.com:5432/staging_db` | Staging database |
| `STRIPE_SECRET_KEY_STAGING` | `sk_test_STAGING_KEY` | Stripe staging key |
| `JWT_SECRET_STAGING` | `staging-jwt-secret-key` | Staging JWT secret |
| `STRIPE_PUBLISHABLE_KEY_STAGING` | `pk_test_STAGING_KEY` | Stripe staging public |

### 4. Create Production Environment Secrets

**⚠️ CRITICAL: Use LIVE API keys for production!**

| Secret Name | Example Value | Purpose |
|------------|---------------|-----------| 
| `API_URL_PRODUCTION` | `https://api.example.com` | Production API |
| `DATABASE_URL_PRODUCTION` | `postgres://prod:pass@prod-db.aws.amazon.com:5432/prod_db` | Production database |
| `STRIPE_SECRET_KEY_PRODUCTION` | `sk_live_XXXXXXXXXXXXX` | **LIVE** Stripe key |
| `JWT_SECRET_PRODUCTION` | `prod-jwt-secret-key-change-me` | Production JWT |
| `STRIPE_PUBLISHABLE_KEY_PRODUCTION` | `pk_live_XXXXXXXXXXXXX` | **LIVE** Stripe public |

## Protecting Production Secrets

### 1. Add Environment Protection Rules

1. Go to **Settings** → **Environments**
2. Click **New environment** → Create `production`
3. Under **Deployment branches**, select:
   - ✓ *Only allow deployments from specified branches*
   - ✓ Select: `main` (or your release branch)

4. Under **Reviewers**, add team members who must approve:
   - ✓ Select **Required reviewers**
   - ✓ Add trusted team members

### 2. Require Branch Protection

1. Go to **Settings** → **Branches**
2. Click **Add rule** for `main` branch
3. Enable:
   - ✓ Require pull request reviews (at least 1)
   - ✓ Require branches to be up to date
   - ✓ Require status checks to pass

## Using Secrets in Workflows

### In GitHub Actions YAML

```yaml
jobs:
  deploy:
    environment: production  # Triggers protection rules
    
    steps:
      - name: Build for Production
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL_PRODUCTION }}
          STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY_PRODUCTION }}
        run: npm run build:production
```

### Accessing Specific Environments

```yaml
name: Deploy to Staging

on:
  push:
    branches: [staging]

jobs:
  deploy-staging:
    environment: staging  # Uses staging secrets
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy
        env:
          API_URL: ${{ secrets.API_URL_STAGING }}
          DB_URL: ${{ secrets.DATABASE_URL_STAGING }}
```

## Best Practices

### ✓ Do's

- ✓ Use environment-specific secret names: `{VAR}_{ENV}`
- ✓ Rotate secrets periodically (quarterly recommended)
- ✓ Use strong, random values (min 32 characters)
- ✓ Document what each secret is for
- ✓ Review access logs regularly
- ✓ Use different values for each environment

### ✗ Don'ts

- ✗ Don't use same secret for multiple environments
- ✗ Don't commit `.env` files or secrets
- ✗ Don't share secrets via email or chat
- ✗ Don't use production secrets in development
- ✗ Don't hardcode defaults in source code
- ✗ Don't log or print secrets

## Testing Secret Access

### 1. Create a Test Workflow

Create `.github/workflows/test-secrets.yml`:

```yaml
name: Test Secret Access

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Check secret exists
        env:
          MY_SECRET: ${{ secrets.API_URL_DEVELOPMENT }}
        run: |
          if [ -z "$MY_SECRET" ]; then
            echo "ERROR: Secret not found!"
            exit 1
          fi
          echo "✓ Secret is accessible"
          # Print first 10 chars only
          echo "Value (masked): ${MY_SECRET:0:10}..."
```

### 2. Verify in Workflow Logs

- Go to **Actions** tab
- View workflow run
- Secrets are automatically masked in logs (shown as `***`)

## Rotating Secrets

### When to Rotate

- Quarterly maintenance
- After employee access revocation
- If accidentally exposed
- After security breach

### Rotation Process

1. **Create new secret value**
2. **Add new secret** with `_V2` suffix:
   - `API_URL_PRODUCTION` → `API_URL_PRODUCTION_V2`
3. **Update applications** to use new value
4. **Monitor** for any issues
5. **Delete old secret** after confirmation

## Troubleshooting

### Secret Not Found in Workflow

**Problem:** `Error: secrets.DATABASE_URL is not defined`

**Solution:**
1. Check spelling matches exactly
2. Verify secret is in correct environment
3. Ensure workflow targets correct environment:
   ```yaml
   environment: production
   ```

### Secrets Not Injected During Build

**Problem:** Environment variable is empty during build

**Solution:**
```bash
# Verify secret exists
# Use JSON format to reference correctly
env:
  DB_URL: ${{ secrets.DATABASE_URL_STAGING }}
```

### Can't See Recent Secrets

**Problem:** Newly created secrets don't appear immediately

**Solution:**
- Refresh the page (F5)
- Wait 30 seconds for cache to clear
- Try in incognito window

## Security Audit Checklist

- [ ] All environment secrets created
- [ ] Production environment protected
- [ ] Branch protection rules enabled
- [ ] Required reviewers configured
- [ ] .env files in .gitignore
- [ ] No secrets in .env.example
- [ ] Workflow uses secret references
- [ ] Secrets are masked in logs
- [ ] Access reviewed quarterly
- [ ] Rotation policy documented

## Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitHub Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/)
- [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/)
