"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/components/ui";
import { NAVIGATION, LINKS } from "@/constants/constants";

const Header: React.FC = () => {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-bg-base/80 backdrop-blur-lg border-b border-border shadow-lg"
                        : "bg-transparent"
                )}
            >
                <nav className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <a href="/" className="flex items-center gap-2 group">
                            <div className="relative w-10 h-10 bg-white rounded-lg p-1.5 transition-transform group-hover:scale-110 shadow-sm">
                                <img
                                    src="/assets/logo-delta-chat-new.svg"
                                    alt="Chat Delta Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="text-xl font-bold text-text-primary hidden sm:inline">
                                Chat Delta
                            </span>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {NAVIGATION.map((item: any) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavClick(item.href)}
                                    className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden md:block">
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => router.push(LINKS.ctaUrl)}
                            >
                                Começar Grátis
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-text-primary hover:bg-white/5 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={cn(
                    "fixed top-20 right-0 bottom-0 w-full max-w-sm bg-bg-surface border-l border-border z-40 md:hidden transition-transform duration-300",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex flex-col p-6 gap-6">
                    <nav className="flex flex-col gap-4">
                        {NAVIGATION.map((item: any, index: any) => (
                            <button
                                key={item.name}
                                onClick={() => handleNavClick(item.href)}
                                className="text-left text-text-primary hover:text-accent text-lg font-medium transition-colors py-3 border-b border-border-subtle"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    <Button
                        variant="primary"
                        size="lg"
                        className="w-full mt-4"
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            router.push(LINKS.ctaUrl);
                        }}
                    >
                        Começar Gratuitamente
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Header;
