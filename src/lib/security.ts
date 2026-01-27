/**
 * Security utilities for input sanitization and validation
 * @module lib/security
 */

/**
 * Sanitize HTML to prevent XSS attacks by encoding dangerous characters
 * 
 * @param dirty - Raw HTML string that may contain malicious code
 * @returns Sanitized string with HTML entities encoded
 * 
 * @example
 * ```typescript
 * sanitizeHTML('<script>alert("XSS")</script>')
 * // Returns: '&lt;script&gt;alert("XSS")&lt;/script&gt;'
 * ```
 */
export function sanitizeHTML(dirty: string): string {
    const temp = document.createElement('div');
    temp.textContent = dirty;
    return temp.innerHTML;
}

/**
 * Sanitize user input by removing HTML tags, JavaScript protocols, and limiting length
 * 
 * @param input - Raw user input string
 * @param maxLength - Maximum allowed length (default: 1000)
 * @returns Sanitized and length-limited string
 * 
 * @example
 * ```typescript
 * sanitizeInput('Hello <b>World</b>', 50)
 * // Returns: 'Hello World'
 * ```
 */
export function sanitizeInput(input: string, maxLength = 1000): string {
    return input
        .trim()
        .replace(/[<>]/g, '') // Remove HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .substring(0, maxLength);
}

/**
 * Validate email address format using regex
 * 
 * @param email - Email address to validate
 * @returns True if email format is valid, false otherwise
 * 
 * @example
 * ```typescript
 * validateEmail('user@example.com') // Returns: true
 * validateEmail('invalid-email')     // Returns: false
 * ```
 */
export function validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
}

/**
 * Validate phone number (international format)
 */
export function validatePhone(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Validate URL format
 */
export function validateURL(url: string): boolean {
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }
}

/**
 * Escape special characters for use in regex
 */
export function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Generate a random string (for CSRF tokens, etc.)
 */
export function generateRandomString(length = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const cryptoObj = window.crypto || (window as any).msCrypto;

    if (cryptoObj && cryptoObj.getRandomValues) {
        const randomValues = new Uint8Array(length);
        cryptoObj.getRandomValues(randomValues);

        for (let i = 0; i < length; i++) {
            result += chars[randomValues[i] % chars.length];
        }
    } else {
        // Fallback for older browsers
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
    }

    return result;
}

/**
 * Validate form data against schema
 */
export interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean;
}

export interface ValidationSchema {
    [key: string]: ValidationRule;
}

export interface ValidationError {
    field: string;
    message: string;
}

export function validateForm(
    data: Record<string, any>,
    schema: ValidationSchema
): ValidationError[] {
    const errors: ValidationError[] = [];

    for (const [field, rules] of Object.entries(schema)) {
        const value = data[field];

        // Required check
        if (rules.required && (!value || value.toString().trim() === '')) {
            errors.push({ field, message: 'Ce champ est requis' });
            continue;
        }

        // Skip other validations if field is empty and not required
        if (!value) continue;

        const stringValue = value.toString();

        // Min length check
        if (rules.minLength && stringValue.length < rules.minLength) {
            errors.push({
                field,
                message: `Minimum ${rules.minLength} caractères requis`
            });
        }

        // Max length check
        if (rules.maxLength && stringValue.length > rules.maxLength) {
            errors.push({
                field,
                message: `Maximum ${rules.maxLength} caractères autorisés`
            });
        }

        // Pattern check
        if (rules.pattern && !rules.pattern.test(stringValue)) {
            errors.push({
                field,
                message: 'Format invalide'
            });
        }

        // Custom validation
        if (rules.custom && !rules.custom(value)) {
            errors.push({
                field,
                message: 'Validation personnalisée échouée'
            });
        }
    }

    return errors;
}

/**
 * Rate limiting helper (client-side)
 */
export class RateLimiter {
    private attempts: Map<string, number[]> = new Map();

    check(key: string, maxAttempts: number, windowMs: number): boolean {
        const now = Date.now();
        const attempts = this.attempts.get(key) || [];

        // Remove old attempts outside the window
        const recentAttempts = attempts.filter(time => now - time < windowMs);

        if (recentAttempts.length >= maxAttempts) {
            return false; // Rate limit exceeded
        }

        recentAttempts.push(now);
        this.attempts.set(key, recentAttempts);

        return true; // Within rate limit
    }

    reset(key: string): void {
        this.attempts.delete(key);
    }
}
