import React from 'react';
import Spinner from './Spinner';

interface LoadingPageProps {
    message?: string;
}

export default function LoadingPage({ message = 'Loading...' }: LoadingPageProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <Spinner size="lg" />
                <p className="mt-4 text-gray-600">{message}</p>
            </div>
        </div>
    );
}

