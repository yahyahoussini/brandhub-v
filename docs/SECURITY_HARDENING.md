# Security Hardening Checklist

Critical security measures to implement before production deployment.

---

## 🔴 CRITICAL - Completed

- [x] Remove .env from git repository
- [x] Add .env to .gitignore
- [x] Create .env.example with placeholders
- [x] Set up Dependabot for dependency scanning
- [x] Create CSRF protection utility
- [x] Implement RLS policies for database

---

## 🟡 HIGH PRIORITY - Completed

- [x] Create server-side rate limiting (Edge Function)
- [x] Add input validation and sanitization
- [x] Document security procedures
- [x] Set up automated security audits

---

## 🟢 NEXT STEPS - Manual Actions Required

### 1. Remove .env from Git History (CRITICAL)

```bash
# If .env was previously committed, remove from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (coordinate with team first!)
git push origin --force --all
```

**Alternative (safer)**:
Use BFG Repo-Cleaner:
```bash
bfg --delete-files .env
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

### 2. Rotate Exposed Credentials

Since .env was committed:
- [ ] Generate new Supabase API keys
- [ ] Update Sentry DSN (if exposed)
- [ ] Rotate any other exposed secrets
- [ ] Update environment variables in Vercel

### 3. Deploy Edge Function

```bash
# Navigate to project root
cd supabase

# Deploy contact form function
supabase functions deploy contact-form

# Set environment variables for function
supabase secrets set SUPABASE_URL=https://your-project.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Enable Dependabot

- Go to GitHub repository → Settings → Security → Code security and analysis
- Enable "Dependabot alerts"
- Enable "Dependabot security updates"
- Dependabot.yml is already configured ✅

### 5. Configure Branch Protection

- Go to Settings → Branches → Add rule for `main`
- Require pull request reviews
- Require status checks (CI) to pass
- Require signed commits (recommended)

---

## 📋 Verification Checklist

Before going live:

- [ ] Run `git log --all -- .env` - should show removal
- [ ] Verify `.env` is in `.gitignore`
- [ ] All secrets rotated
- [ ] Edge function deployed and tested
- [ ] Dependabot enabled and creating PRs
- [ ] Security audit workflow running
- [ ] Team trained on security procedures

---

## 🛡️ Security Layers Now In Place

| Layer | Implementation | Status |
|-------|----------------|--------|
| **Client-Side** | CSRF tokens, input sanitization | ✅ |
| **Server-Side** | Rate limiting (5 req/hour) | ✅ |
| **Database** | RLS policies, admin role check | ✅ |
| **Network** | Security headers, CORS | ✅ |
| **Dependencies** | Dependabot, automated audits | ✅ |
| **Monitoring** | Sentry error tracking | ✅ |

---

**⚠️ IMPORTANT**: Complete the manual steps above before production deployment!
