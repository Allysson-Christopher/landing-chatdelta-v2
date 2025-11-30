"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button, Section } from "@/components/ui";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import WhatsAppShowcase from "@/components/sections/WhatsAppShowcase";
import { HERO, LINKS } from "@/constants/constants";

const Hero: React.FC = () => {
    const router = useRouter();

    const scrollToNextSection = () => {
        const element = document.querySelector("#como-funciona");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    return (
        <Section
            id="hero"
            className="min-h-screen flex items-center justify-center pt-20 pb-12"
            bg="base"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-[0.03]" />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Content */}
                    <div className="text-center space-y-8">
                        <RevealOnScroll variant="fadeUp" delay={0.1} width="100%">
                            <div className="flex justify-center">
                                {HERO.badge && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4">
                                        {HERO.badge}
                                    </div>
                                )}
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-text-primary">
                                <span className="block">{HERO.headline.split(" ").slice(0, 3).join(" ")}</span>
                                <span className="gradient-text">
                                    {HERO.headline.split(" ").slice(3).join(" ")}
                                </span>
                            </h1>
                        </RevealOnScroll>

                        <RevealOnScroll variant="fadeUp" delay={0.2} width="100%">
                            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
                                {HERO.subheadline}
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll variant="fadeUp" delay={0.3} width="100%">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Button
                                    size="lg"
                                    variant="primary"
                                    onClick={() => router.push(LINKS.ctaUrl)}
                                    className="w-full sm:w-auto"
                                >
                                    {HERO.ctaPrimary}
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={scrollToNextSection}
                                    className="w-full sm:w-auto"
                                >
                                    {HERO.ctaSecondary}
                                </Button>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Right Column: Visual */}
                    <div className="relative lg:h-[600px] flex items-center justify-center">
                        <RevealOnScroll variant="scale" delay={0.4} className="w-full">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-accent/20 blur-3xl rounded-full transform scale-90" />
                                <WhatsAppShowcase />
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.button
                onClick={scrollToNextSection}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-tertiary hover:text-text-secondary transition-colors"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                aria-label="Rolar para próxima seção"
            >
                <ChevronDown className="w-8 h-8" />
            </motion.button>
        </Section>
    );
};

export default Hero;
