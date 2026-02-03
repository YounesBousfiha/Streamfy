import {type ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-[#e50914] hover:bg-[#b20710] text-white border-transparent',
            outline: 'bg-transparent border border-white/30 text-white hover:bg-white/10',
            ghost: 'bg-transparent text-gray-300 hover:text-white hover:bg-white/5',
        };

        return (
            <button
                ref={ref}
        className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-12 px-8 py-2 w-full uppercase tracking-wide",
            variants[variant],
            className
    )}
        disabled={isLoading || props.disabled}
        {...props}
    >
        {isLoading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
        ) : null}
        {children}
        </button>
    );
    }
);
Button.displayName = 'Button';