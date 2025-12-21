import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
    title?: string;
    message: string;
    onRetry?: () => void;
    className?: string;
}

export default function ErrorMessage({
    title = 'Error',
    message,
    onRetry,
    className = '',
}: ErrorMessageProps) {
    return (
        <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
            <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-red-800">{title}</h3>
                    <p className="text-sm text-red-700 mt-1">{message}</p>
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="mt-3 text-sm font-medium text-red-600 hover:text-red-800 underline"
                        >
                            Try again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

