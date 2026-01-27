# Security Credential Rotation Guide

> [!CAUTION]
> **CRITICAL**: Complete these steps IMMEDIATELY before deploying to production

## Step 1: Rotate Supabase Credentials

### 1.1 Generate New API Keys

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Navigate to **Settings** → **API**
3. Under **Project API keys**, click **Reset** for:
   - `anon` (public) key
   - `service_role` key

### 1.2 Update Environment Variables

**Local Development:**
- Update `c:\Users\yahya\Downloads\brandhub-morocco-forge-main (1)\brandhub-morocco-forge-main\.env`
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<NEW_ANON_KEY>
VITE_SUPABASE_PROJECT_ID=<YOUR_PROJECT_ID>
```

**Production (Vercel):**
1. Go to Vercel Dashboard
2. Select your project
3. Navigate to **Settings** → **Environment Variables**
4. Update the following variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`

### 1.3 Redeploy Application
```bash
git add .env
git commit -m "chore: update supabase credentials"
vercel --prod
```

---

## Step 2: Remove .env from Git History

> [!WARNING]
> Coordinate with your team before force-pushing!

### Method 1: Using BFG Repo-Cleaner (Recommended)

```bash
# Download BFG
# https://rtyley.github.io/bfg-repo-cleaner/

# Clone a fresh copy
git clone --mirror https://github.com/YOUR_REPO.git repo-mirror
cd repo-mirror

# Remove .env file from history
java -jar bfg.jar --delete-files .env

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push
git push --force
```

### Method 2: Using git filter-branch

```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

### 2.3 Verify Removal
```bash
git log --all -- .env
# Should return nothing
```

---

## Step 3: Verify Security

### 3.1 Checklist
- [ ] New Supabase keys generated
- [ ] Local `.env` updated
- [ ] Vercel environment variables updated
- [ ] `.env` removed from Git history
- [ ] Application redeployed
- [ ] Old keys revoked in Supabase

### 3.2 Test Application
- [ ] Test API calls are working
- [ ] Test authentication flow
- [ ] Check Sentry for errors
- [ ] Verify no broken functionality

---

## Step 4: Rotate Sentry DSN (If Exposed)

1. Go to Sentry Dashboard
2. Navigate to **Settings** → **Projects**
3. Select your project
4. Click **Client Keys (DSN)**
5. Generate new DSN or disable old one
6. Update `.env` and `.sentryclirc`

```env
# .env
VITE_SENTRY_DSN=<NEW_DSN>

# .sentryclirc
[auth]
token=<NEW_TOKEN>
```

---

## Completion Checklist

Before marking this task complete:

- [ ] All credentials rotated
- [ ] `.env` file removed from Git history  
- [ ] Team notified of changes
- [ ] Production deployment successful
- [ ] No errors in Sentry dashboard
- [ ] API calls functioning correctly

**Estimated Time:** 2-3 hours

**⚠️ DO NOT PROCEED with other tasks until this is complete!**
