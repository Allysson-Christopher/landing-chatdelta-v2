import React from "react";
import { MessageCircle, FileText, MessageSquare, CheckCircle } from "lucide-react";
import { Section } from "@/components/ui";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { HOW_IT_WORKS } from "@/constants/constants";

const iconMap = {
    MessageCircle,
    FileText,
    MessageSquare,
    CheckCircle,
};

const HowItWorks: React.FC = () => {
    return (
        <Section id="como-funciona" bg="base" className="relative">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <RevealOnScroll variant="fadeUp" width="100%">
                        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                            {HOW_IT_WORKS.title}
                        </h2>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                            Em apenas 4 passos simples, você transforma seus documentos em realidade
                        </p>
                    </RevealOnScroll>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {HOW_IT_WORKS.steps.map((step: any, index: any) => {
                        const Icon = iconMap[step.icon as keyof typeof iconMap] || MessageCircle;
                        const isLast = index === HOW_IT_WORKS.steps.length - 1;

                        return (
                            <RevealOnScroll key={step.number} variant="fadeUp" delay={index * 0.1} width="100%">
                                <div className="relative">
                                    {/* Connector Line */}
                                    {!isLast && (
                                        <div className="absolute left-[40px] top-[80px] w-0.5 h-[calc(100%+2rem)] bg-gradient-to-b from-primary-500/50 to-primary-500/20" />
                                    )}

                                    {/* Card */}
                                    <div className="glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 border border-white/5 hover:border-primary-500/30 group relative">
                                        <div className="flex items-start gap-6">
                                            {/* Number Badge */}
                                            <div className="flex-shrink-0">
                                                <div className="relative">
                                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
                                                        <span className="text-3xl font-bold text-white">{step.number}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 pt-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20 group-hover:text-primary-300 transition-colors">
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-text-primary">{step.title}</h3>
                                                </div>
                                                <p className="text-text-secondary leading-relaxed text-base">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>

                {/* Bottom CTA hint */}
                <RevealOnScroll variant="fadeUp" delay={0.5} width="100%">
                    <div className="text-center mt-12">
                        <p className="text-text-tertiary text-sm">
                            Comece agora e tenha seus documentos prontos em minutos!
                        </p>
                    </div>
                </RevealOnScroll>
            </div>
        </Section>
    );
};

export default HowItWorks;
