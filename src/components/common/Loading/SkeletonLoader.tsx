import React from 'react';

interface SkeletonProps {
    className?: string;
}

export function SkeletonLine({ className = '' }: SkeletonProps) {
    return (
        <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
    );
}

export function SkeletonCard({ className = '' }: SkeletonProps) {
    return (
        <div className={`bg-white rounded-xl p-6 shadow-sm ${className}`}>
            <div className="animate-pulse space-y-4">
                <SkeletonLine className="h-4 w-3/4" />
                <SkeletonLine className="h-4 w-1/2" />
                <SkeletonLine className="h-8 w-full" />
            </div>
        </div>
    );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
                {Array.from({ length: rows }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                        <div className="flex-1 space-y-2">
                            <SkeletonLine className="h-4 w-1/4" />
                            <SkeletonLine className="h-3 w-1/3" />
                        </div>
                        <SkeletonLine className="h-4 w-20" />
                    </div>
                ))}
            </div>
        </div>
    );
}

