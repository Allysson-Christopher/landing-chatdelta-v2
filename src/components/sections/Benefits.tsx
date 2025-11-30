import React from "react";
import { Zap, ShieldCheck, FolderOpen } from "lucide-react";
import { Card, Section } from "@/components/ui";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { BENEFITS } from "@/constants/constants";

const iconMap = {
    Zap,
    ShieldCheck,
    FolderOpen,
};

const Benefits: React.FC = () => {
    return (
        <Section bg="surface" className="relative">
            <div className="container-custom">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <RevealOnScroll variant="fadeUp" width="100%">
                        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
                            {BENEFITS.title}
                        </h2>
                        <div className="h-1 w-20 bg-primary-500 mx-auto rounded-full" />
                    </RevealOnScroll>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {BENEFITS.items.map((benefit: any, index: any) => {
                        const Icon = iconMap[benefit.icon as keyof typeof iconMap] || Zap;

                        return (
                            <RevealOnScroll
                                key={benefit.title}
                                variant="fadeUp"
                                delay={index * 0.15}
                                className="h-full"
                                width="100%"
                            >
                                <Card glow className="h-full flex flex-col items-center text-center p-8 group">
                                    <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-8 h-8 text-primary-400 group-hover:text-primary-300 transition-colors" />
                                    </div>

                                    <h3 className="text-xl font-bold text-text-primary mb-4">
                                        {benefit.title}
                                    </h3>

                                    <p className="text-text-secondary leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </Card>
                            </RevealOnScroll>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
};

export default Benefits;
