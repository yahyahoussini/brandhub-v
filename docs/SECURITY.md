# Security Documentation - BrandHub Morocco

Comprehensive security guide for developers and administrators.

---

## Row Level Security (RLS) Policies

### Overview

All database tables are protected with Row Level Security policies implemented in Supabase. This ensures data access is controlled at the database level.

### Policy Structure

#### Blog Posts (`blog_posts`)

- **Public Read**: Anyone can read published posts (`is_published = true`)
- **Authenticated Read**: Logged-in users can see all posts (including drafts)
- **Admin Write**: Only admins can create, update, or delete posts

#### Testimonials (`testimonials`)

- **Public Read**: Anyone can read published testimonials
- **Admin Write**: Only admins can manage testimonials

#### Projects (`projects`)

- **Public Read**: Portfolio is fully public
- **Admin Write**: Only admins can manage portfolio items

#### Services (`services`)

- **Public Read**: Service catalog is public
- **Admin Write**: Only admins can manage services

#### Contact Inquiries (`contact_inquiries`)

- **Public Create**: Anyone can submit contact forms (unauthenticated)
- **Admin Read/Write**: Only admins can view and manage inquiries

### Admin Role Check

The `is_admin()` function checks if the current user has admin privileges:

```sql
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    WHERE auth.uid() = id
    AND raw_user_meta_data->>'role' = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Setting Admin Role

To grant admin access to a user:

```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'admin@brandhub.ma';
```

---

## CSRF Protection

### Implementation

CSRF tokens are generated client-side and validated for all form submissions.

### Usage in Forms

```typescript
import { useCSRFToken } from '@/lib/csrf';

function ContactForm() {
  const { token, getHeaders } = useCSRFToken();

  const handleSubmit = async (data) => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: {
        ...getHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Token Lifecycle

- **Generation**: Automatic on first access
- **Storage**: sessionStorage (cleared on tab close)
- **Expiry**: 1 hour
- **Renewal**: Auto-renewed on expiry

---

## Input Sanitization

All user inputs are sanitized using utilities in `src/lib/security.ts`.

### HTML Sanitization

Prevents XSS attacks by encoding HTML entities:

```typescript
import { sanitizeHTML } from '@/lib/security';

const userInput = '<script>alert("XSS")</script>';
const safe = sanitizeHTML(userInput);
// Result: &lt;script&gt;alert("XSS")&lt;/script&gt;
```

### Input Validation

```typescript
import { validateEmail, validatePhone, validateURL } from '@/lib/security';

validateEmail('user@example.com'); // true
validatePhone('+212 607 076 940'); // true
validateURL('https://brandhub.ma'); // true
```

### Form Validation

```typescript
import { validateForm, type ValidationSchema } from '@/lib/security';

const schema: ValidationSchema = {
  email: { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
  password: { required: true, minLength: 8, maxLength: 100 },
  age: { custom: (value) => value >= 18 },
};

const errors = validateForm(formData, schema);
if (errors.length > 0) {
  // Handle validation errors
}
```

---

## Rate Limiting

### Client-Side Rate Limiting

Prevents abuse by limiting requests per time window:

```typescript
import { RateLimiter } from '@/lib/security';

const limiter = new RateLimiter();

// Allow 5 requests per minute
if (!limiter.check('contact-form', 5, 60000)) {
  toast.error('Too many requests. Please try again later.');
  return;
}

// Process request
await submitForm();
```

### Server-Side Rate Limiting

For Supabase Edge Functions, implement rate limiting with Deno KV:

```typescript
// supabase/functions/contact-form/index.ts
const kv = await Deno.openKv();

async function rateLimit(ip: string): Promise<boolean> {
  const key = ['rate_limit', ip];
  const result = await kv.get(key);
  
  if (result.value && result.value > 5) {
    return false; // Rate limited
  }
  
  await kv.atomic()
    .sum(key, 1)
    .commit();
  
  // Expire after 1 hour
  await kv.set(key, 0, { expireIn: 3600000 });
  
  return true;
}
```

---

## Authentication Flow

### Login

```typescript
import { supabase } from '@/integrations/supabase/client';
import { setUserContext } from '@/lib/sentry';

const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

if (data.user) {
  // Set Sentry user context for error tracking
  setUserContext({
    id: data.user.id,
    email: data.user.email,
  });
}
```

### Logout

```typescript
import { clearUserContext } from '@/lib/sentry';
import { clearCSRFToken } from '@/lib/csrf';

await supabase.auth.signOut();

// Clear security contexts
clearUserContext();
clearCSRFToken();
```

---

## Environment Variables Security

### Validation

All environment variables are validated on app startup using Zod:

```typescript
// src/lib/env.ts
const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  VITE_SUPABASE_PROJECT_ID: z.string().min(1),
});

// App will not start if variables are missing or invalid
```

### Best Practices

- ✅ **Never commit `.env`** to repository
- ✅ **Use `.env.example`** for documentation
- ✅ **Rotate keys regularly** (every 90 days)
- ✅ **Use different keys** for dev/staging/prod
- ✅ **Store secrets in** Vercel Environment Variables
- ✅ **Enable 2FA** on all accounts (GitHub, Vercel, Supabase)

---

## Security Headers

Configured in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; ..."
        }
      ]
    }
  ]
}
```

---

## Incident Response

### If a Security Issue is Discovered

1. **Assess Severity**
   - Critical: Data breach, auth bypass
   - High: XSS, CSRF vulnerability
   - Medium: Missing validation
   - Low: Information disclosure

2. **Immediate Actions** (Critical/High)
   - Notify team immediately
   - Roll back to last stable version
   - Disable affected feature if possible
   - Investigate scope of breach

3. **Mitigation**
   - Patch vulnerability
   - Deploy fix
   - Verify fix effectiveness
   - Monitor for exploitation attempts

4. **Communication**
   - Notify affected users (if applicable)
   - Document incident
   - Update security policies
   - Conduct post-mortem

### Security Contacts

- **Security Lead**: [contact email]
- **Database Admin**: [contact email]
- **Emergency Hotline**: [phone number]

---

## Security Checklist for Contributors

Before submitting a PR:

- [ ] No sensitive data in code or commits
- [ ] All user inputs validated and sanitized
- [ ] CSRF tokens used for state-changing operations
- [ ] Rate limiting implemented for endpoints
- [ ] SQL injection prevented (use parameterized queries)
- [ ] XSS prevention implemented
- [ ] Authentication required for sensitive operations
- [ ] Authorization checked (RLS policies)
- [ ] Secrets not hardcoded
- [ ] Dependencies up to date (`npm audit`)

---

## Regular Security Maintenance

### Weekly
- Review Sentry error reports for suspicious activity
- Check failed login attempts
- Monitor rate limit violations

### Monthly
- Review and update dependencies (`npm audit fix`)
- Review access logs in Supabase
- Test backup restoration procedure

### Quarterly
- Rotate API keys and secrets
- Security audit of new features
- Review and update RLS policies
- Penetration testing (if budget allows)

### Annually
- Full security audit
- Update security documentation
- Security training for team
- Review incident response plan

---

**Last Updated**: 2026-01-26  
**Document Owner**: Security Team  
**Next Review Date**: 2026-04-26
