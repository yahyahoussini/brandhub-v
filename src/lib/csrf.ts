/**
 * CSRF (Cross-Site Request Forgery) Protection
 * Generates and validates CSRF tokens for form submissions
 */

const TOKEN_KEY = 'csrf_token';
const TOKEN_EXPIRY_KEY = 'csrf_token_expiry';
const TOKEN_LIFETIME_MS = 60 * 60 * 1000; // 1 hour

/**
 * Generate a cryptographically secure random token
 */
function generateToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Get or create a CSRF token
 * Token is stored in sessionStorage and expires after 1 hour
 */
export function getCSRFToken(): string {
    const now = Date.now();
    const token = sessionStorage.getItem(TOKEN_KEY);
    const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);

    // Return existing token if valid
    if (token && expiry && parseInt(expiry) > now) {
        return token;
    }

    // Generate new token
    const newToken = generateToken();
    const newExpiry = now + TOKEN_LIFETIME_MS;

    sessionStorage.setItem(TOKEN_KEY, newToken);
    sessionStorage.setItem(TOKEN_EXPIRY_KEY, newExpiry.toString());

    return newToken;
}

/**
 * Validate a CSRF token
 */
export function validateCSRFToken(token: string): boolean {
    const now = Date.now();
    const storedToken = sessionStorage.getItem(TOKEN_KEY);
    const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);

    if (!storedToken || !expiry) {
        return false;
    }

    if (parseInt(expiry) <= now) {
        // Token expired
        clearCSRFToken();
        return false;
    }

    return storedToken === token;
}

/**
 * Clear the CSRF token (e.g., on logout)
 */
export function clearCSRFToken(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
}

/**
 * Add CSRF token to form data
 */
export function addCSRFTokenToFormData(formData: FormData): FormData {
    const token = getCSRFToken();
    formData.append('csrf_token', token);
    return formData;
}

/**
 * Add CSRF token to request headers
 */
export function getCSRFHeaders(): Record<string, string> {
    return {
        'X-CSRF-Token': getCSRFToken(),
    };
}

/**
 * React hook for CSRF protection
 */
export function useCSRFToken() {
    const token = getCSRFToken();

    const addToFormData = (formData: FormData) => {
        formData.append('csrf_token', token);
        return formData;
    };

    const getHeaders = () => ({
        'X-CSRF-Token': token,
    });

    return {
        token,
        addToFormData,
        getHeaders,
        validate: validateCSRFToken,
        clear: clearCSRFToken,
    };
}
