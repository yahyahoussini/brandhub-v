# BrandHub Morocco - Technical Documentation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd brandhub-morocco-forge-main

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

---

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── admin/          # Admin dashboard components
│   ├── portfolio/      # Portfolio components
│   └── ErrorBoundary.tsx # Error handling
├── pages/              # Route pages
├── lib/                # Core utilities
│   ├── env.ts         # Environment validation
│   ├── logger.ts      # Centralized logging
│   ├── security.ts    # Security utilities
│   ├── api.ts         # API client
│   └── performance.ts # Performance monitoring
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations
│   └── supabase/      # Supabase client
├── types/              # TypeScript definitions
└── styles/             # Global styles
```

---

## 🛠️ Tech Stack

### Core
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite + SWC (fast refresh)
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)

### Styling
- **CSS Framework**: TailwindCSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion + GSAP
- **Icons**: Lucide React

### Backend
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage

### 3D/Graphics
- **3D**: Three.js + Spline
- **Libraries**: @react-three/fiber, @react-three/drei

---

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Environment Variables

Required variables in `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

---

## 🏗️ Architecture

### TypeScript Configuration
- **Strict Mode**: Enabled for maximum type safety
- **No Implicit Any**: All types must be explicit
- **Strict Null Checks**: Prevents null/undefined errors

### Error Handling
- **Error Boundary**: Catches React errors globally
- **Centralized Logger**: Structured logging with levels
- **API Error Handling**: User-friendly error messages

### Security
- **Input Sanitization**: All user inputs sanitized
- **Environment Validation**: Type-safe env vars with Zod
- **Security Headers**: Configured in vercel.json
- **CSRF Protection**: Rate limiting on client-side

### Performance
- **Code Splitting**: Route-based and feature-based splitting
- **Lazy Loading**: All routes lazy-loaded
- **Image Optimization**: Lazy loading with shimmer effects
- **Bundle Optimization**: Vendor and feature chunks
- **Core Web Vitals**: Automatic monitoring

---

## 📦 Build Configuration

### Code Splitting Strategy

**Vendor Chunks**:
- `vendor-react`: React core libraries
- `vendor-ui`: Radix UI components
- `vendor-three`: Three.js and related
- `vendor-anim`: Animation libraries
- `vendor-supabase`: Supabase client
- `vendor-query`: TanStack Query

**Feature Chunks**:
- `feature-admin`: Admin dashboard
- `feature-blog`: Blog pages
- `feature-portfolio`: Portfolio section

### Caching Strategy
- **Static Assets**: 1 year cache (immutable)
- **React Query**: 5min stale, 10min cache
- **Service Workers**: (Future implementation)

---

## 🔐 Security

### Implemented Measures

1. **Security Headers** (vercel.json)
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: SAMEORIGIN
   - X-XSS-Protection: 1; mode=block
   - Strict-Transport-Security
   - Content-Security-Policy

2. **Input Validation**
   - Email validation
   - Phone validation
   - URL validation
   - Form schema validation

3. **Rate Limiting**
   - Client-side rate limiter
   - Prevents spam/abuse

4. **Error Handling**
   - No sensitive data in errors
   - User-friendly messages
   - Detailed logs (dev only)

---

## 📊 Monitoring

### Performance Metrics

Automatically tracked Core Web Vitals:
- **LCP**: Largest Contentful Paint (< 2.5s)
- **FID**: First Input Delay (< 100ms)
- **CLS**: Cumulative Layout Shift (< 0.1)
- **TTFB**: Time to First Byte (< 800ms)

### Logging

Log levels:
- `DEBUG`: Development information
- `INFO`: General information
- `WARN`: Warning conditions
- `ERROR`: Error conditions

Usage:
```typescript
import { logger } from '@/lib/logger';

logger.info('User logged in', { userId: '123' });
logger.error('Operation failed', error, { context });
```

---

## 🧪 Testing

### Test Structure

```
src/
└── __tests__/
    ├── unit/          # Unit tests
    ├── integration/   # Integration tests
    └── e2e/           # End-to-end tests
```

### Running Tests

```bash
npm run test         # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Variables

Set in Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```

---

## 🎨 Design System

### Typography
- **Display Font**: Playfair Display (h1-h3)
- **Body Font**: Inter (paragraphs, h4-h6)
- **Monospace**: Fira Code

### Colors
- **Primary**: Deep blue (#1e40af)
- **Accent**: Purple (#a855f7)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)

### Spacing
- Based on 8px grid system
- Tokens: `--space-xs` to `--space-5xl`

### Components
- Premium hover effects (lift, scale, glow)
- Glass morphism cards
- Shimmer loading states
- Gradient borders

---

## 🤝 Contributing

### Code Standards

1. **TypeScript**: Strict mode, no implicit any
2. **Components**: Functional components with hooks
3. **Styling**: TailwindCSS utility classes
4. **Testing**: Test business logic and components
5. **Commits**: Conventional commits format

### Before PR

- [ ] TypeScript compiles without errors
- [ ] Linter passes
- [ ] Tests pass
- [ ] Build succeeds
- [ ] No console errors

---

## 📝 API Documentation

### Supabase Tables

**blog_posts**
- id, title, content, slug, created_at
- is_published, author, tags

**testimonials**
- id, name, company, content, rating
- is_published, created_at

**projects**
- id, title, description, image_url
- category, technologies, url

**services**
- id, name, description, category
- pricing, features

---

## 🐛 Troubleshooting

### Common Issues

**TypeScript Errors After Update**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Vite Dev Server Not Starting**
```bash
# Check port 8080 is free
lsof -i :8080
# Or change port in vite.config.ts
```

**Supabase Connection Issues**
- Verify environment variables
- Check Supabase project status
- Verify API keys are correct

---

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

---

## 📄 License

[Your License Here]

---

## 👥 Team

BrandHub.ma - Agence Digitale Premium au Maroc

- Website: https://brandhub.ma
- Email: contact@brandhub.ma
- Phone: +212 607 076 940

---

**Built with ❤️ in Morocco**
