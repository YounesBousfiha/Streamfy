import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { forwardRef, type InputHTMLAttributes } from 'react';

// Utility function bach n-mergiw classes
function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5 w-full">
            {label && <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>}
                <input
        ref={ref}
        className={cn(
            "flex h-12 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#e50914] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
            error && "border-red-500 focus:ring-red-500",
            className
    )}
        {...props}
        />
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
            </div>
        );
        }
    );
        Input.displayName = 'Input';