#!/bin/bash

# Setup guide for GitHub Secrets
echo "==========================================
GitHub Secrets Setup Guide
=========================================="

echo ""
echo "📋 Required Secrets for Each Environment:"
echo ""

echo "🔵 DEVELOPMENT Environment:"
echo "  • API_URL_DEVELOPMENT=http://localhost:3000/api"
echo "  • DATABASE_URL_DEVELOPMENT=postgres://dev:pass@localhost:5432/dev_db"
echo "  • STRIPE_SECRET_KEY_DEVELOPMENT=sk_test_xxxxx"
echo "  • JWT_SECRET_DEVELOPMENT=dev-secret"
echo "  • STRIPE_PUBLISHABLE_KEY_DEVELOPMENT=pk_test_xxxxx"
echo ""

echo "🟡 STAGING Environment:"
echo "  • API_URL_STAGING=https://staging-api.example.com"
echo "  • DATABASE_URL_STAGING=postgres://staging:pass@staging-db.aws:5432/staging_db"
echo "  • STRIPE_SECRET_KEY_STAGING=sk_test_xxxxx"
echo "  • JWT_SECRET_STAGING=staging-secret"
echo "  • STRIPE_PUBLISHABLE_KEY_STAGING=pk_test_xxxxx"
echo ""

echo "🔴 PRODUCTION Environment (⚠️ USE LIVE KEYS):"
echo "  • API_URL_PRODUCTION=https://api.example.com"
echo "  • DATABASE_URL_PRODUCTION=postgres://prod:pass@prod-db.aws:5432/prod_db"
echo "  • STRIPE_SECRET_KEY_PRODUCTION=sk_live_xxxxx"
echo "  • JWT_SECRET_PRODUCTION=prod-secret"
echo "  • STRIPE_PUBLISHABLE_KEY_PRODUCTION=pk_live_xxxxx"
echo ""

echo "📖 To Add Secrets:"
echo "1. Go to GitHub Repository"
echo "2. Settings → Secrets and variables → Actions"
echo "3. Click 'New repository secret'"
echo "4. Add each secret from the lists above"
echo ""

echo "🔒 Protection Rules for Production:"
echo "1. Settings → Environments"
echo "2. Create 'production' environment"
echo "3. Add reviewers for approval"
echo "4. Restrict to 'main' branch only"
echo ""

echo "✅ Verification:"
echo "  Run: npm run build:production"
echo "  Check: cat .env.local (should be in .gitignore)"
echo ""
