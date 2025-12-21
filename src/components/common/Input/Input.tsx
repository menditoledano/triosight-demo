import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
    'w-full border rounded-lg transition-shadow focus:outline-none',
    {
        variants: {
            variant: {
                default: 'border-gray-200 focus:ring-2 focus:ring-mint-500 focus:border-transparent',
                error: 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent',
            },
            inputSize: {
                default: 'h-[50px] px-5 text-[14px]',
                sm: 'h-9 px-3 text-sm',
                lg: 'h-12 px-6 text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            inputSize: 'default',
        },
    }
);

interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
        VariantProps<typeof inputVariants> {
    error?: string;
    label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, inputSize, error, label, ...props }, ref) => {
        return (
            <div className="space-y-2">
                {label && (
                    <label className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <input
                    className={inputVariants({ variant: error ? 'error' : variant, inputSize, className })}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';