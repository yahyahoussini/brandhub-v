import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    sanitizeHTML,
    sanitizeInput,
    validateEmail,
    validatePhone,
    validateURL,
    escapeRegex,
    generateRandomString,
    validateForm,
    RateLimiter,
    type ValidationSchema,
} from '../security';

describe('sanitizeHTML', () => {
    it('should encode HTML entities', () => {
        const dirty = '<script>alert("XSS")</script>';
        const clean = sanitizeHTML(dirty);
        expect(clean).not.toContain('<script>');
        expect(clean).toContain('&lt;script&gt;');
    });

    it('should handle empty strings', () => {
        expect(sanitizeHTML('')).toBe('');
    });

    it('should preserve plain text', () => {
        const text = 'Hello World';
        expect(sanitizeHTML(text)).toBe(text);
    });
});

describe('sanitizeInput', () => {
    it('should remove HTML tags', () => {
        const input = 'Hello <b>World</b>';
        const result = sanitizeInput(input);
        expect(result).toBe('Hello World');
    });

    it('should remove javascript: protocol', () => {
        const input = 'javascript:alert(1)';
        const result = sanitizeInput(input);
        expect(result).not.toContain('javascript:');
    });

    it('should trim whitespace', () => {
        const input = '  hello  ';
        const result = sanitizeInput(input);
        expect(result).toBe('hello');
    });

    it('should enforce max length', () => {
        const longString = 'a'.repeat(2000);
        const result = sanitizeInput(longString, 100);
        expect(result.length).toBe(100);
    });
});

describe('validateEmail', () => {
    it('should validate correct emails', () => {
        expect(validateEmail('test@example.com')).toBe(true);
        expect(validateEmail('user+tag@domain.co.uk')).toBe(true);
        expect(validateEmail('name.last@company.com')).toBe(true);
    });

    it('should reject invalid emails', () => {
        expect(validateEmail('notanemail')).toBe(false);
        expect(validateEmail('@example.com')).toBe(false);
        expect(validateEmail('user@')).toBe(false);
        expect(validateEmail('user @example.com')).toBe(false);
    });

    it('should handle empty strings', () => {
        expect(validateEmail('')).toBe(false);
    });
});

describe('validatePhone', () => {
    it('should validate phone numbers with 10-15 digits', () => {
        expect(validatePhone('+1234567890')).toBe(true);
        expect(validatePhone('123-456-7890')).toBe(true);
        expect(validatePhone('+212 607 076 940')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
        expect(validatePhone('123')).toBe(false);
        expect(validatePhone('12345678901234567890')).toBe(false);
        expect(validatePhone('abcdefghij')).toBe(false);
    });
});

describe('validateURL', () => {
    it('should validate HTTP(S) URLs', () => {
        expect(validateURL('https://example.com')).toBe(true);
        expect(validateURL('http://example.com')).toBe(true);
        expect(validateURL('https://sub.example.com/path?query=1')).toBe(true);
    });

    it('should reject invalid URLs', () => {
        expect(validateURL('not-a-url')).toBe(false);
        expect(validateURL('ftp://example.com')).toBe(false);
        expect(validateURL('javascript:alert(1)')).toBe(false);
    });
});

describe('escapeRegex', () => {
    it('should escape special regex characters', () => {
        const input = 'hello.*+?^${}()|[]\\world';
        const escaped = escapeRegex(input);
        expect(escaped).toBe('hello\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\world');
    });
});

describe('generateRandomString', () => {
    it('should generate string of specified length', () => {
        const str = generateRandomString(32);
        expect(str.length).toBe(32);
    });

    it('should generate different strings each time', () => {
        const str1 = generateRandomString(32);
        const str2 = generateRandomString(32);
        expect(str1).not.toBe(str2);
    });

    it('should only contain alphanumeric characters', () => {
        const str = generateRandomString(100);
        expect(str).toMatch(/^[A-Za-z0-9]+$/);
    });
});

describe('validateForm', () => {
    it('should validate required fields', () => {
        const schema: ValidationSchema = {
            name: { required: true },
            email: { required: true },
        };

        const valid = { name: 'John', email: 'john@example.com' };
        const invalid = { name: '', email: 'john@example.com' };

        expect(validateForm(valid, schema)).toHaveLength(0);
        expect(validateForm(invalid, schema)).toHaveLength(1);
        expect(validateForm(invalid, schema)[0].field).toBe('name');
    });

    it('should validate min/max length', () => {
        const schema: ValidationSchema = {
            password: { minLength: 8, maxLength: 20 },
        };

        const tooShort = { password: '123' };
        const tooLong = { password: 'a'.repeat(25) };
        const valid = { password: 'validpassword' };

        expect(validateForm(tooShort, schema)).toHaveLength(1);
        expect(validateForm(tooLong, schema)).toHaveLength(1);
        expect(validateForm(valid, schema)).toHaveLength(0);
    });

    it('should validate with regex pattern', () => {
        const schema: ValidationSchema = {
            code: { pattern: /^[A-Z]{3}\d{3}$/ },
        };

        const valid = { code: 'ABC123' };
        const invalid = { code: 'abc123' };

        expect(validateForm(valid, schema)).toHaveLength(0);
        expect(validateForm(invalid, schema)).toHaveLength(1);
    });

    it('should validate with custom function', () => {
        const schema: ValidationSchema = {
            age: { custom: (value) => value >= 18 },
        };

        const valid = { age: 25 };
        const invalid = { age: 15 };

        expect(validateForm(valid, schema)).toHaveLength(0);
        expect(validateForm(invalid, schema)).toHaveLength(1);
    });
});

describe('RateLimiter', () => {
    let limiter: RateLimiter;

    beforeEach(() => {
        limiter = new RateLimiter();
    });

    it('should allow requests within limit', () => {
        expect(limiter.check('test-key', 3, 1000)).toBe(true);
        expect(limiter.check('test-key', 3, 1000)).toBe(true);
        expect(limiter.check('test-key', 3, 1000)).toBe(true);
    });

    it('should block requests exceeding limit', () => {
        limiter.check('test-key', 2, 1000);
        limiter.check('test-key', 2, 1000);
        expect(limiter.check('test-key', 2, 1000)).toBe(false);
    });

    it('should reset after time window', async () => {
        limiter.check('test-key', 1, 100);
        expect(limiter.check('test-key', 1, 100)).toBe(false);

        // Wait for window to expire
        await new Promise(resolve => setTimeout(resolve, 150));

        expect(limiter.check('test-key', 1, 100)).toBe(true);
    });

    it('should track different keys separately', () => {
        limiter.check('key1', 1, 1000);
        expect(limiter.check('key1', 1, 1000)).toBe(false);
        expect(limiter.check('key2', 1, 1000)).toBe(true);
    });

    it('should reset specific key', () => {
        limiter.check('test-key', 1, 1000);
        expect(limiter.check('test-key', 1, 1000)).toBe(false);

        limiter.reset('test-key');
        expect(limiter.check('test-key', 1, 1000)).toBe(true);
    });
});
