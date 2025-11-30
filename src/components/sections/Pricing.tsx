"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/components/ui";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import PricingCard from "@/components/pricing/PricingCard";
import { PRICING, LINKS } from "@/constants/constants";

const Pricing: React.FC = () => {
    const router = useRouter();
    const billingCycle = "monthly" as const;

    const handleSelectPlan = (planType: string) => {
        if (planType === "enterprise") {
            window.location.href = `mailto:${LINKS.supportEmail}?subject=Interesse no Plano Enterprise`;
        } else {
            router.push("/cadastro");
        }
    };

    return (
        <Section id="planos" bg="base" className="relative">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <RevealOnScroll variant="fadeUp" width="100%">
                        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                            {PRICING.title}
                        </h2>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
                            Escolha o plano que melhor se adapta à sua necessidade.
                        </p>
                    </RevealOnScroll>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRICING.plans.map((plan: any, index: any) => (
                        <RevealOnScroll
                            key={plan.name}
                            variant="fadeUp"
                            delay={index * 0.1}
                            className="h-full"
                            width="100%"
                        >
                            <PricingCard
                                plan={plan}
                                interactive={true}
                                billingCycle={billingCycle}
                                onSelect={handleSelectPlan}
                            />
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Pricing;
