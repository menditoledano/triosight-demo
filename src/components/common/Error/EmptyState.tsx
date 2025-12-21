import React from 'react';
import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
    title?: string;
    message?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    icon?: React.ReactNode;
}

export default function EmptyState({
    title = 'No data found',
    message = 'There is no data to display at the moment.',
    action,
    icon,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 mb-4 text-gray-400">
                {icon || <FileQuestion className="w-full h-full" />}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 max-w-sm mb-6">{message}</p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}

