import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: 'mint' | 'navy' | 'white';
    className?: string;
}

export default function Spinner({ size = 'md', color = 'mint', className = '' }: SpinnerProps) {
    const sizeClasses = {
        sm: 'h-4 w-4 border-2',
        md: 'h-8 w-8 border-2',
        lg: 'h-12 w-12 border-3',
    };

    const colorClasses = {
        mint: 'border-mint-500 border-t-transparent',
        navy: 'border-navy-900 border-t-transparent',
        white: 'border-white border-t-transparent',
    };

    return (
        <div
            className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
            role="status"
            aria-label="Loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
}

