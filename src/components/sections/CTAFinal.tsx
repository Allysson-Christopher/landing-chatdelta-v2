"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button, Section } from "@/components/ui";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { CTA_FINAL, LINKS } from "@/constants/constants";

const CTAFinal: React.FC = () => {
    const router = useRouter();
    return (
        <Section bg="base" className="relative overflow-hidden !py-32">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg-base via-primary-900/20 to-bg-base pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <RevealOnScroll variant="fadeDown" width="100%">
                        <div className="flex justify-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold mb-4">
                                <Sparkles className="w-4 h-4" />
                                <span>Comece hoje mesmo</span>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll variant="scale" delay={0.1} width="100%">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                            {CTA_FINAL.headline}
                        </h2>
                    </RevealOnScroll>

                    <RevealOnScroll variant="fadeUp" delay={0.2} width="100%">
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                            {CTA_FINAL.subtext}
                        </p>
                    </RevealOnScroll>

                    <RevealOnScroll variant="fadeUp" delay={0.3} width="100%">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <Button
                                size="lg"
                                variant="primary"
                                onClick={() => router.push(LINKS.ctaUrl)}
                                className="group text-lg px-10 py-4"
                            >
                                {CTA_FINAL.cta}
                                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => {
                                    const element = document.querySelector("#como-funciona");
                                    if (element) {
                                        element.scrollIntoView({ behavior: "smooth", block: "center" });
                                    }
                                }}
                                className="text-lg px-10 py-4"
                            >
                                Ver Como Funciona
                            </Button>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </Section>
    );
};

export default CTAFinal;
