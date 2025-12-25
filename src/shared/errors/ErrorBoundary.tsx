import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '../../presentation/components/ui/Button/Button';
import { AlertTriangle } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleRetry = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center bg-white dark:bg-[#111722] rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-full text-red-500 mb-4">
                        <AlertTriangle size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Algo deu errado!</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md">
                        Ocorreu um erro inesperado ao processar sua solicitação.
                    </p>
                    <div className="flex gap-3">
                        <Button onClick={() => this.setState({ hasError: false })} variant="outline">
                            Tentar novamente
                        </Button>
                        <Button onClick={() => window.location.reload()}>
                            Recarregar página
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
