# Deployment Guide - BrandHub Morocco

Complete guide for deploying the BrandHub Morocco application to production.

---

## Prerequisites

Before deploying, ensure you have:

- [x] **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
- [x] **Supabase Project**: Active Supabase project with migrations applied
- [x] **Sentry Account** (Optional): For error monitoring at [sentry.io](https://sentry.io)
- [x] **All Tests Passing**: Run `npm run test` locally
- [x] **Build Succeeds**: Run `npm run build` locally

---

## Environment Variables Setup

### 1. Create Vercel Project

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link project
vercel link
```

### 2. Configure Environment Variables

In your **Vercel Dashboard** → **Settings** → **Environment Variables**, add:

#### Required Variables (All Environments)

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJh...` | Supabase anon/public key |
| `VITE_SUPABASE_PROJECT_ID` | `your-project-id` | Supabase project identifier |

#### Optional Variables (Production Only)

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_SENTRY_DSN` | `https://...@sentry.io/...` | Sentry error tracking |
| `VITE_APP_VERSION` | `1.0.0` | Application version |

#### CI/CD Variables (GitHub Secrets)

Add these in **GitHub** → **Settings** → **Secrets and variables** → **Actions**:

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel deployment token |
| `VERCEL_ORG_ID` | From `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | From `.vercel/project.json` |
| `SENTRY_AUTH_TOKEN` | Sentry authentication token |
| `SENTRY_ORG` | Your Sentry organization slug |
| `SENTRY_PROJECT` | Your Sentry project slug |
| `CODECOV_TOKEN` | Codecov upload token (optional) |

---

## First-Time Deployment

### Step 1: Verify Build Locally

```bash
# Install dependencies
npm install

# Run tests
npm run test

# Build for production
npm run build

# Preview production build
npm run preview
```

### Step 2: Configure Supabase

```bash
# Apply database migrations
cd supabase
supabase db push

# Verify Row Level Security policies
supabase db dump --schema-only
```

### Step 3: Deploy to Vercel

```bash
# Deploy to production
vercel --prod
```

Or push to `main` branch for automatic deployment via GitHub Actions.

---

## Production Deployment Process

### Standard Deployment (via Git)

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/your-feature
   ```

4. **CI runs automatically**
   - Linting
   - Type checking
   - Tests with coverage
   - Build verification

5. **Merge to main**
   - Review PR
   - Merge when CI passes
   - Auto-deployment triggers

6. **Verify deployment**
   - Check Vercel dashboard for deployment URL
   - Test critical user flows
   - Monitor Sentry for errors

---

## Manual Deployment (Emergency)

If automatic deployment fails:

```bash
# Pull latest
git pull origin main

# Install dependencies
npm ci

# Build
npm run build

# Deploy manually
vercel --prod
```

---

## Rollback Procedures

### Option 1: Vercel Dashboard (Recommended)

1. Go to **Vercel Dashboard** → **Deployments**
2. Find the last working deployment
3. Click **⋯** → **Promote to Production**
4. Confirm rollback

### Option 2: Git Revert

```bash
# Find commit to revert
git log --oneline

# Revert commit
git revert <commit-hash>

# Push to trigger new deployment
git push origin main
```

### Option 3: Vercel CLI

```bash
# List deployments
vercel ls

# Promote specific deployment
vercel promote <deployment-url>
```

---

## Health Check Verification

After deployment, verify:

### 1. Application Loads
```bash
curl -I https://brandhub.ma
# Should return 200 OK
```

### 2. Critical Pages
- [ ] Homepage loads
- [ ] Contact form works
- [ ] Blog posts display
- [ ] Portfolio loads
- [ ] Admin panel accessible

### 3. Database Connection
- Check Supabase connection in browser console
- Verify data loads correctly

### 4. Error Monitoring
- Check Sentry dashboard for errors
- Verify source maps working

---

## Monitoring Post-Deployment

### Vercel Analytics
- Check **Analytics** tab in Vercel dashboard
- Monitor Core Web Vitals

### Sentry Dashboard
- **Issues** → Review error reports
- **Performance** → Check transaction times
- **Releases** → Verify new release tracked

### Supabase
- **Database** → Check query performance
- **Auth** → Verify authentication works
- **Storage** → Check file uploads

---

## Common Deployment Issues

### Build Fails

**Error**: `Error: Build failed`

**Solution**:
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

### Environment Variables Not Loading

**Error**: `VITE_SUPABASE_URL is not defined`

**Solution**:
- Verify variables in Vercel dashboard
- Ensure they're set for Production environment
- Redeploy after adding variables

### Database Connection Errors

**Error**: `Failed to connect to Supabase`

**Solution**:
1. Check Supabase project status
2. Verify API keys are correct
3. Check Row Level Security policies
4. Verify network connectivity

### Source Maps Not Uploading to Sentry

**Error**: `Failed to upload source maps`

**Solution**:
1. Verify `SENTRY_AUTH_TOKEN` is set
2. Check Sentry CLI is installed
3. Verify `.sentryclirc` configuration
4. Check GitHub Actions logs

---

## Performance Optimization Checklist

After deployment, optimize:

- [ ] Enable Vercel Edge Network
- [ ] Configure CDN caching headers
- [ ] Enable Brotli compression
- [ ] Verify lazy loading works
- [ ] Check bundle sizes (should be <200KB initial)
- [ ] Monitor Core Web Vitals
- [ ] Set up Lighthouse CI

---

## Security Checklist

Before going live:

- [ ] Remove `.env` from repository (if committed)
- [ ] Verify all secrets in GitHub Secrets
- [ ] Enable Vercel Password Protection for staging
- [ ] Configure security headers in `vercel.json`
- [ ] Verify HTTPS redirect works
- [ ] Test CORS configuration
- [ ] Review Supabase RLS policies
- [ ] Enable 2FA on Vercel, Supabase, GitHub

---

## Deployment Checklist Template

Use this for every production deployment:

```markdown
## Pre-Deployment
- [ ] All tests passing locally
- [ ] Build succeeds locally
- [ ] No console errors in browser
- [ ] Environment variables updated
- [ ] Database migrations applied
- [ ] Changelog updated

## Deployment
- [ ] PR merged to main
- [ ] CI/CD pipeline passed
- [ ] Deployment completed on Vercel
- [ ] New release created in Sentry

## Post-Deployment  
- [ ] Homepage loads correctly
- [ ] Critical user flows tested
- [ ] No errors in Sentry
- [ ] Performance metrics normal
- [ ] Database queries optimized
- [ ] Team notified of deployment

## Rollback Ready
- [ ] Previous deployment URL noted
- [ ] Rollback procedure reviewed
- [ ] Emergency contacts available
```

---

## Support & Troubleshooting

For deployment issues:

1. **Check CI/CD logs**: GitHub Actions → Workflow runs
2. **Check Vercel logs**: Vercel Dashboard → Function logs
3. **Check Sentry**: Error dashboard
4. **Check Supabase**: Database logs

**Emergency Contacts**:
- DevOps Lead: [contact email]
- Database Admin: [contact email]
- On-call Engineer: [contact email]

---

**Last Updated**: 2026-01-26  
**Document Owner**: DevOps Team
