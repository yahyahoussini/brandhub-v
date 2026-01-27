# Design System Documentation - BrandHub Morocco

Complete guide to the design system, tokens, and component patterns.

---

## 🎨 Color System

### CSS Variables

All colors are defined using HSL for easy manipulation:

```css
:root {
  /* Brand Colors */
  --primary: 248 100% 50%;        /* #0060FF - Primary blue */
  --primary-foreground: 0 0% 100%;
  
  --secondary: 280 60% 60%;       /* Purple accent */
  --secondary-foreground: 0 0% 100%;
  
  --accent: 160 60% 50%;          /* Teal accent */
  --accent-foreground: 0 0% 100%;
  
  /* Neutral Palette */
  --background: 0 0% 100%;        /* White */
  --foreground: 222.2 84% 4.9%;   /* Near black */
  
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  
  /* Semantic Colors */
  --destructive: 0 84.2% 60.2%;   /* Red for errors/delete */
  --destructive-foreground: 0 0% 98%;
  
  --success: 142 71% 45%;         /* Green for success */
  --warning: 38 92% 50%;          /* Orange for warnings */
  --info: 199 89% 48%;            /* Blue for info */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode variants */
}
```

### WCAG Contrast Ratios

| Combination | Ratio | WCAG AA | WCAG AAA |
|-------------|-------|---------|----------|
| Primary / White | 8.2:1 | ✅ Pass | ✅ Pass |
| Primary / Background | 8.2:1 | ✅ Pass | ✅ Pass |
| Muted-foreground / Background | 5.1:1 | ✅ Pass | ⚠️ Large text only |
| Destructive / White | 4.8:1 | ✅ Pass | ⚠️ Large text only |

**Tool**: Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 📏 Spacing Scale

Based on 4px grid system (0.25rem):

```css
:root {
  --spacing-0: 0rem;      /* 0px */
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.25rem;   /* 20px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
  --spacing-20: 5rem;     /* 80px */
  --spacing-24: 6rem;     /* 96px */
}
```

---

## 🔤 Typography

### Font Families

```css
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Outfit', 'Inter', sans-serif;
  --font-mono: 'Fira Code', 'Consolas', monospace;
}
```

### Type Scale

```css
:root {
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */
  --text-6xl: 3.75rem;    /* 60px */
}
```

### Line Heights

```css
:root {
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}
```

---

## 🎬 Motion & Animation

### Duration Tokens

```css
:root {
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 750ms;
}
```

### Easing Functions

```css
:root {
  /* Standard easings */
  --ease-linear: cubic-bezier(0, 0, 1, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Custom easings */
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-smooth: cubic-bezier(0.45, 0.05, 0.55, 0.95);
  --ease-premium: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Usage Examples

```css
/* Button hover */
.button {
  transition: all var(--duration-fast) var(--ease-out);
}

/* Card entrance */
.card {
  animation: fade-in-up var(--duration-normal) var(--ease-premium);
}

/* Modal backdrop */
.backdrop {
  transition: opacity var(--duration-slow) var(--ease-in-out);
}
```

---

## 🔲 Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;    /* 2px */
  --radius-DEFAULT: 0.375rem; /* 6px */
  --radius-md: 0.5rem;      /* 8px */
  --radius-lg: 0.75rem;     /* 12px */
  --radius-xl: 1rem;        /* 16px */
  --radius-2xl: 1.5rem;     /* 24px */
  --radius-full: 9999px;    /* Circle */
}
```

---

## 🌑 Shadow System

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-DEFAULT: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
  
  /* Premium shadow */
  --shadow-premium: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
}
```

---

## ♿ Accessibility

### Focus Styles

```css
:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :focus-visible {
    outline-width: 3px;
  }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🎯 Component Patterns

### Buttons

```tsx
// Primary button
<button className="btn-primary">
  Click me
</button>

// With icon
<button className="btn-primary" aria-label="Save changes">
  <SaveIcon aria-hidden="true" />
  <span>Save</span>
</button>

// Loading state
<button className="btn-primary" disabled aria-busy="true">
  <LoadingSpinner aria-label="Loading" />
  <span>Processing...</span>
</button>
```

### Cards

```tsx
// Basic card
<div className="card" role="article">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>

// Interactive card
<a href="/details" className="card-interactive">
  <h3>Clickable Card</h3>
  <p>Learn more...</p>
  <span className="sr-only">Read full article about...</span>
</a>
```

---

## 🧪 Testing

### Color Contrast Testing

```bash
# Install axe-core
npm install -D @axe-core/cli

# Run accessibility audit
npx axe http://localhost:8080 --tags wcag2aa,wcag21aa
```

### Keyboard Navigation

Essential keyboard shortcuts:
- `Tab` - Navigate forward
- `Shift + Tab` - Navigate backward
- `Enter` - Activate button/link
- `Space` - Toggle checkbox/select
- `Esc` - Close modal/dialog
- `Arrow keys` - Navigate menus

### Screen Reader Testing

Test with:
- **NVDA** (Windows, free)
- **JAWS** (Windows, paid)
- **VoiceOver** (macOS, built-in)

---

## 📚 Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Axe DevTools](https://www.deque.com/axe/devtools/)

---

**Last Updated**: 2026-01-26  
**Version**: 1.0
