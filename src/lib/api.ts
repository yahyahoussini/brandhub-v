import { logger } from '@/lib/logger';

export class APIError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public response?: unknown
    ) {
        super(message);
        this.name = 'APIError';
    }
}

interface RequestConfig extends RequestInit {
    params?: Record<string, string>;
}

/**
 * Generic API client for making HTTP requests
 * Handles errors, logging, and provides a consistent interface
 */
class APIClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request<T>(
        endpoint: string,
        config: RequestConfig = {}
    ): Promise<T> {
        const { params, ...fetchConfig } = config;

        // Build URL with query params
        const url = new URL(endpoint, this.baseURL);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }

        const requestId = Math.random().toString(36).substring(7);
        logger.debug(`API Request [${requestId}]`, {
            method: fetchConfig.method || 'GET',
            url: url.toString(),
        });

        try {
            const response = await fetch(url.toString(), {
                ...fetchConfig,
                headers: {
                    'Content-Type': 'application/json',
                    ...fetchConfig.headers,
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const error = new APIError(
                    response.status,
                    response.statusText,
                    errorData
                );

                logger.error(
                    `API Error [${requestId}]`,
                    error,
                    {
                        status: response.status,
                        statusText: response.statusText,
                        response: errorData,
                    }
                );

                throw error;
            }

            const data = await response.json();
            logger.debug(`API Success [${requestId}]`, { data });

            return data;
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }

            logger.error(`Network error [${requestId}]`, error as Error);
            throw new APIError(0, 'Network error');
        }
    }

    async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, { ...config, method: 'GET' });
    }

    async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, { ...config, method: 'DELETE' });
    }

    async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }
}

// Export singleton instance
export const apiClient = new APIClient(import.meta.env.VITE_API_URL || '');

// Helper function to handle API errors with user-friendly messages
export function getUserFriendlyErrorMessage(error: unknown): string {
    if (error instanceof APIError) {
        switch (error.statusCode) {
            case 400:
                return 'Requête invalide. Veuillez vérifier vos données.';
            case 401:
                return 'Session expirée. Veuillez vous reconnecter.';
            case 403:
                return 'Accès refusé.';
            case 404:
                return 'Ressource non trouvée.';
            case 429:
                return 'Trop de requêtes. Veuillez réessayer plus tard.';
            case 500:
                return 'Erreur serveur. Nos équipes ont été notifiées.';
            case 503:
                return 'Service temporairement indisponible.';
            default:
                return 'Une erreur s\'est produite. Veuillez réessayer.';
        }
    }

    return 'Une erreur inattendue s\'est produite.';
}
