import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { logger } from '@/lib/logger';
import { captureError } from '@/lib/sentry';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onReset?: () => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        logger.error('React Error Boundary caught an error', error, {
            componentStack: errorInfo.componentStack,
        });

        this.setState({
            errorInfo,
        });

        // Send to Sentry error tracking
        captureError(error, {
            componentStack: errorInfo.componentStack,
            errorBoundary: true,
        });
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        if (this.props.onReset) {
            this.props.onReset();
        } else {
            window.location.href = '/';
        }
    };

    private handleReload = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            // Custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default error UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-4">
                    <div className="max-w-md w-full space-y-8 text-center animate-fade-in-up">
                        {/* Icon */}
                        <div className="flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                                <AlertTriangle className="w-10 h-10 text-destructive" />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-3">
                            <h1 className="text-3xl font-display font-bold">
                                Oups! Une erreur s'est produite
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Nous avons été notifiés et travaillons sur une solution.
                                Veuillez réessayer dans quelques instants.
                            </p>
                        </div>

                        {/* Error details in development */}
                        {import.meta.env.DEV && this.state.error && (
                            <div className="text-left bg-muted/50 p-6 rounded-lg border border-border space-y-2">
                                <p className="text-sm font-semibold text-destructive">
                                    Détails de l'erreur (développement uniquement):
                                </p>
                                <pre className="text-xs overflow-auto max-h-40 text-muted-foreground">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button
                                size="lg"
                                onClick={this.handleReset}
                                className="hover-lift shadow-premium"
                            >
                                <Home className="mr-2 w-5 h-5" />
                                Retour à l'accueil
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={this.handleReload}
                                className="hover-glow"
                            >
                                <RefreshCw className="mr-2 w-5 h-5" />
                                Recharger la page
                            </Button>
                        </div>

                        {/* Help text */}
                        <p className="text-sm text-muted-foreground">
                            Si le problème persiste, contactez-nous à{' '}
                            <a href="mailto:contact@brandhub.ma" className="text-primary hover:underline">
                                contact@brandhub.ma
                            </a>
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
