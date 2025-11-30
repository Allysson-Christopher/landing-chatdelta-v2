import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant = "primary",
    size = "md",
    isLoading,
    children,
    ...props
}) => {
    const variants = {
        primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-primary-600/20",
        secondary: "bg-bg-surface-hover hover:bg-border text-text-primary",
        outline: "border border-primary-600 text-primary-400 hover:bg-primary-600/10",
        ghost: "hover:bg-white/5 text-text-secondary hover:text-text-primary",
        accent: "bg-accent hover:bg-accent-hover text-white shadow-lg hover:shadow-accent/20",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading || props.disabled}
            {...(props as any)}
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            ) : null}
            {children}
        </motion.button>
    );
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, glow, children, ...props }) => {
    return (
        <div
            className={cn(
                "glass rounded-2xl p-6 transition-all duration-300",
                glow && "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] hover:border-primary-500/30",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    bg?: "base" | "surface" | "transparent";
}

export const Section: React.FC<SectionProps> = ({ className, bg = "base", children, ...props }) => {
    const bgs = {
        base: "bg-bg-base",
        surface: "bg-bg-surface",
        transparent: "bg-transparent",
    };

    return (
        <section className={cn("py-16 sm:py-24 relative overflow-hidden", bgs[bg], className)} {...props}>
            {children}
        </section>
    );
};
