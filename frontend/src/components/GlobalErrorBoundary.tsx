import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class GlobalErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center bg-[#030712] p-6 text-center text-slate-100">
                    <div className="glass-panel max-w-md p-8">
                        <h1 className="mb-4 text-2xl font-bold text-cyan-400">Something went wrong</h1>
                        <p className="mb-6 text-slate-400">
                            The application encountered an unexpected error. This is often due to missing environment variables on deployment.
                        </p>
                        <div className="mb-6 rounded-lg bg-slate-950/50 p-4 text-left font-mono text-xs text-red-400 overflow-auto max-h-40">
                            {this.state.error?.message}
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-premium w-full"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;
