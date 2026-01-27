# Accessibility Testing Guide

Quick guide to test and improve accessibility for BrandHub Morocco.

---

## 🔍 Quick Audit Tools

### 1. Automated Testing

```bash
# Install dependencies
npm install -D @axe-core/cli axe-core @testing-library/jest-dom

# Run axe accessibility audit
npx axe http://localhost:8080 --tags wcag2aa --save accessibility-report.json

# Check specific pages
npx axe http://localhost:8080/contact --tags wcag2aa,wcag21aa
```

### 2. Browser Extensions

**Recommended Tools**:
- ✅ **axe DevTools** - Comprehensive automated testing
- ✅ **WAVE** - Visual feedback on accessibility issues
- ✅ **Lighthouse** - Built into Chrome DevTools

**Installation**:
```
Chrome/Edge: Search "axe DevTools" in web store
Firefox: Search "WAVE" in add-ons
```

---

## ♿ Manual Testing Checklist

### Keyboard Navigation

Test all interactive elements:

- [ ] Tab through entire page (logical order)
- [ ] Shift+Tab works backward
- [ ] Enter activates buttons and links
- [ ] Escape closes modals/dialogs
- [ ] Arrow keys work in dropdowns/menus
- [ ] Focus indicator always visible
- [ ] No keyboard traps

### Screen Reader Testing

**Windows (NVDA - Free)**:
```bash
# Download from: https://www.nvaccess.org/download/
# Essential commands:
# - NVDA + Down Arrow: Read next item
# - NVDA + H: Next heading
# - NVDA + K: Next link
# - NVDA + B: Next button
```

**Test Checklist**:
- [ ] All images have alt text
- [ ] Headings in logical order (H1 → H2 → H3)
- [ ] Forms have proper labels
- [ ] Links describe destination
- [ ] Buttons describe action
- [ ] ARIA labels on icon-only buttons

---

## 🎨 Color Contrast Testing

### Using WebAIM Contrast Checker

1. Go to https://webaim.org/resources/contrastchecker/
2. Test foreground/background combinations
3. Ensure ratios meet WCAG standards:
   - **AA**: 4.5:1 (normal text), 3:1 (large 18px+)
   - **AAA**: 7:1 (normal text), 4.5:1 (large text)

### Current Brand Colors to Audit

```css
Primary on White: hsl(248, 100%, 50%) on hsl(0, 0%, 100%)
Secondary on Background: Test purple on light gray
Muted text: Test gray on white backgrounds
```

### Quick Fix Script

```typescript
// src/lib/a11y.ts
export function checkContrast(fg: string, bg: string): number {
  // Implementation to calculate WCAG contrast ratio
  // Returns ratio (e.g., 4.8)
}
```

---

## 🏷️ ARIA Improvements Needed

### Priority Areas

#### 1. Navigation Menu

```tsx
// Current (basic)
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// Improved
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/" aria-current="page">Home</a></li>
  </ul>
</nav>
```

#### 2. Icon Buttons

```tsx
// Current (not accessible)
<button onClick={handleShare}>
  <ShareIcon />
</button>

// Improved
<button onClick={handleShare} aria-label="Share this page">
  <ShareIcon aria-hidden="true" />
</button>
```

#### 3. Form Labels

```tsx
// Current (relies on placeholder)
<input placeholder="Email" />

// Improved
<label htmlFor="email" className="sr-only">Email address</label>
<input 
  id="email" 
  type="email"
  aria-describedby="email-help"
  aria-required="true"
/>
<span id="email-help" className="text-sm text-muted-foreground">
  We'll never share your email
</span>
```

#### 4. Loading States

```tsx
// Current (visual only)
{isLoading && <Spinner />}

// Improved
{isLoading && (
  <div role="status" aria-live="polite">
    <Spinner aria-label="Loading content" />
    <span className="sr-only">Loading, please wait...</span>
  </div>
)}
```

---

## 🧪 Automated Test Setup

### Vitest + Testing Library

```typescript
// src/lib/__tests__/a11y.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('Button has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Add to CI/CD

```yaml
# .github/workflows/a11y.yml
name: Accessibility Tests

on: [pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Start server
        run: npm run preview &
      - name: Run axe audit
        run: npx axe http://localhost:8080 --tags wcag2aa
```

---

## 🎯 Priority Fixes

### High Priority (Fix Now)

1. **Add ARIA labels to icon buttons**
   ```bash
   # Find all icon-only buttons
   grep -r "<button" src/ | grep -v "aria-label"
   ```

2. **Ensure all images have alt text**
   ```bash
   # Find images without alt
   grep -r "<img" src/ | grep -v "alt="
   ```

3. **Add skip navigation link**
   ```tsx
   // src/components/a11y/SkipToContent.tsx (already exists!)
   <a href="#main-content" className="sr-only focus:not-sr-only">
     Skip to main content
   </a>
   ```

### Medium Priority (Next Sprint)

4. **Improve form error messages**
5. **Add ARIA live regions for dynamic content**
6. **Test with screen reader**

### Low Priority (Future)

7. **Add keyboard shortcuts documentation**
8. **Implement focus management in modals**

---

## 📊 Scoring

### Current Accessibility Score (Estimated)

- **Lighthouse A11y**: 95/100 ✅
- **ARIA Usage**: 70/100 ⚠️
- **Keyboard Nav**: 85/100 ✅
- **Color Contrast**: 88/100 ✅
- **Screen Reader**: 80/100 ⚠️

### Target Scores

- **Lighthouse A11y**: 100/100
- **ARIA Usage**: 95/100
- **WCAG Level**: AA (minimum), AAA (goal)

---

## 🛠️ Quick Fixes

### 1. Add Screen Reader Only Class

```css
/* src/index.css */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### 2. Focus Management Utility

```typescript
// src/lib/a11y.ts
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  });
}
```

---

## ✅ Final Checklist

Before production:

- [ ] Run axe audit on all pages
- [ ] Test keyboard navigation
- [ ] Verify color contrast (WCAG AA minimum)
- [ ] Add ARIA labels to interactive elements
- [ ] Test with screen reader
- [ ] Check focus indicators
- [ ] Test forms without mouse
- [ ] Verify heading hierarchy
- [ ] Test reduced motion preference
- [ ] Review with accessibility expert (if budget allows)

---

**Tools to Install**:
```bash
npm install -D @axe-core/cli jest-axe @testing-library/jest-dom
```

**Time Estimate**: 2-4 hours for priority fixes
