"use client";

import React, { useState } from "react";
import { Section } from "@/components/ui";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import PricingCard from "@/components/pricing/PricingCard";
import { PRICING, LINKS } from "@/constants/constants";

const Pricing: React.FC = () => {
    const billingCycle = "monthly" as const;
    const [showFreeSignupModal, setShowFreeSignupModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const handleFreeSignup = async () => {
        setIsSubmitting(true);
        // Simulação de chamada de API
        setTimeout(() => {
            setSuccessMessage("✅ Cadastro realizado com sucesso! Verifique seu WhatsApp para receber a mensagem de boas-vindas.");
            setFormData({ name: "", email: "", phone: "" });
            setTimeout(() => {
                setShowFreeSignupModal(false);
                setSuccessMessage("");
                // Se for plano pago, aqui redirecionaria para o Mercado Pago
                if (selectedPlan && selectedPlan !== "free") {
                    // TODO: Redirecionar para Mercado Pago
                    // window.location.href = "https://mercadopago.com.br/..."
                }
            }, 3000);
            setIsSubmitting(false);
        }, 1500);
    };

    const handleSelectPlan = (planType: string) => {
        if (planType === "enterprise") {
            window.location.href = `mailto:${LINKS.supportEmail}?subject=Interesse no Plano Enterprise`;
        } else {
            setSelectedPlan(planType);
            setShowFreeSignupModal(true);
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


            {/* Modal de Cadastro FREE */}
            {showFreeSignupModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-bg-surface border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
                        <button 
                            onClick={() => setShowFreeSignupModal(false)}
                            className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors"
                        >
                            ✕
                        </button>
                        
                        <h3 className="text-2xl font-bold mb-2 text-text-primary">
                            {selectedPlan === "free" ? "Cadastro Gratuito" : "Complete seu Cadastro"}
                        </h3>
                        <p className="text-text-secondary mb-6">Preencha seus dados para começar a usar o Chat Delta.</p>
                        
                        {successMessage ? (
                            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-lg text-center">
                                {successMessage}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1">Nome completo</label>
                                    <input
                                        type="text"
                                        placeholder="Seu nome"
                                        className="w-full px-4 py-3 bg-bg-base border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1">E-mail</label>
                                    <input
                                        type="email"
                                        placeholder="seu@email.com"
                                        className="w-full px-4 py-3 bg-bg-base border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-1">WhatsApp</label>
                                    <input
                                        type="tel"
                                        placeholder="(00) 00000-0000"
                                        className="w-full px-4 py-3 bg-bg-base border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() => setShowFreeSignupModal(false)}
                                        className="flex-1 px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5 text-text-primary transition-colors font-medium"
                                        disabled={isSubmitting}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleFreeSignup}
                                        className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold shadow-lg shadow-primary-600/20"
                                        disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
                                    >
                                        {isSubmitting ? "Processando..." : "Confirmar Cadastro"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Section>
    );
};

export default Pricing;
