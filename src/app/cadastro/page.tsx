"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { PRICING } from "@/constants/constants";
import { Button } from "@/components/ui";

type PlanType = 'free' | 'basic' | 'professional' | 'basic_biannual' | 'professional_biannual';

interface SignupFormData {
  name: string;
  email: string;
  phone: string;
}

export default function CadastroPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePlanSelect = (planType: PlanType) => {
    setSelectedPlan(planType);
  };

  const getPlanDisplayName = (planType: PlanType): string => {
    switch (planType) {
      case "free":
        return "Plano Gratuito";
      case "basic":
      case "basic_biannual":
        return "Plano Básico";
      case "professional":
      case "professional_biannual":
        return "Plano Profissional";
      default:
        return "Plano Desconhecido";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

      // Formatar telefone para E.164
      const phone = formData.phone.replace(/\D/g, '');
      const phoneE164 = phone.length === 11 ? `+55${phone}` : `+${phone}`;

      const response = await fetch(`${API_URL}/api/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: crypto.randomUUID(),
          plan: selectedPlan,
          email: formData.email,
          name: formData.name,
          phone: phoneE164,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro ao criar assinatura");
      }

      const data = await response.json();

      // Para plano FREE: mostrar modal de sucesso
      if (selectedPlan === "free") {
        setShowSuccessModal(true);
        setTimeout(() => {
          router.push('/');
        }, 3000);
        return;
      }

      // Para planos pagos: salvar no localStorage e redirecionar para página de aguardando
      localStorage.setItem('pendingSubscriptionId', data.id);
      localStorage.setItem('pendingSubscriptionPlan', selectedPlan as string);
      localStorage.setItem('pendingCheckoutUrl', data.checkout_url || '');

      router.push('/aguardando-confirmacao');
    } catch (err) {
      console.error("Erro ao criar assinatura:", err);
      setError(err instanceof Error ? err.message : "Erro inesperado. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-bg-base relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-accent/5 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-bg-base/80 backdrop-blur-lg">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 bg-white rounded-lg p-1.5 transition-transform group-hover:scale-110 shadow-sm">
                <img
                  src="/assets/logo-delta-chat-new.svg"
                  alt="Chat Delta Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-text-primary">
                Chat Delta
              </span>
            </Link>

            <Link
              href="/"
              className="flex items-center gap-2 text-text-tertiary hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Voltar</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 py-12 sm:py-20">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {/* Título */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
                Comece Agora
              </h1>
              <p className="text-lg text-text-secondary">
                Escolha o plano ideal e transforme sua rotina de trabalho
              </p>
            </motion.div>

            {!selectedPlan ? (
              /* Seleção de Planos */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRICING.plans.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => !plan.isEnterprise && handlePlanSelect(plan.pricing.monthly.planType as PlanType)}
                    className={`relative rounded-2xl p-6 cursor-pointer transition-all ${
                      plan.highlighted
                        ? 'bg-gradient-to-br from-primary-500/10 to-accent/10 border-2 border-primary-500'
                        : 'bg-bg-surface border border-border hover:border-primary-500/50'
                    }`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-500 to-accent rounded-full text-white text-xs font-semibold">
                        {plan.badge}
                      </div>
                    )}

                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-text-primary mb-2">{plan.name}</h3>
                      <p className="text-text-tertiary text-sm mb-4">{plan.description}</p>

                      <div className="mb-4">
                        {plan.pricing.monthly.price === null ? (
                          <span className="text-2xl font-bold gradient-text">Sob Consulta</span>
                        ) : (
                          <>
                            <span className="text-3xl font-black gradient-text">
                              {plan.pricing.monthly.price === 0 ? 'Grátis' : `R$ ${plan.pricing.monthly.price}`}
                            </span>
                            {plan.pricing.monthly.price > 0 && (
                              <span className="text-text-tertiary text-sm">/mês</span>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-text-secondary text-sm">
                          <span className="text-accent mt-0.5">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={plan.highlighted ? "primary" : "outline"}
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (plan.isEnterprise) {
                          window.location.href = `mailto:chatdelta.atendimento@gmail.com?subject=Interesse no Plano Enterprise`;
                        } else {
                          handlePlanSelect(plan.pricing.monthly.planType as PlanType);
                        }
                      }}
                    >
                      {plan.cta}
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Formulário de Cadastro */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-bg-surface rounded-2xl p-8 border border-border shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
                      Complete seu Cadastro
                    </h2>
                    <p className="text-text-secondary">
                      Plano selecionado:{" "}
                      <span className="font-semibold text-accent">
                        {getPlanDisplayName(selectedPlan)}
                      </span>
                    </p>
                  </div>

                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-red-500 text-sm">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 rounded-lg bg-bg-base border border-border text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 rounded-lg bg-bg-base border border-border text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                        Telefone (WhatsApp)
                        <span className="block text-xs text-text-tertiary font-normal mt-1">
                          Este será o número autorizado a usar o Chat Delta
                        </span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 rounded-lg bg-bg-base border border-border text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50"
                        placeholder="(81) 99999-9999"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-primary-500 to-accent text-white font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processando...
                        </>
                      ) : selectedPlan === "free" ? (
                        "Finalizar Cadastro"
                      ) : (
                        "Continuar para Pagamento"
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPlan(null)}
                      disabled={isLoading}
                      className="w-full py-3 text-text-tertiary hover:text-text-primary transition-colors text-sm disabled:opacity-50"
                    >
                      Voltar para escolha de planos
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-bg-surface/50 backdrop-blur-lg mt-auto">
        <div className="container-custom py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-tertiary text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Chat Delta. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="/termos-de-uso" className="text-text-tertiary hover:text-text-primary text-sm transition-colors">
                Termos de Uso
              </Link>
              <Link href="/politica-de-privacidade" className="text-text-tertiary hover:text-text-primary text-sm transition-colors">
                Privacidade
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Sucesso para Plano FREE */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Cadastro Realizado!
              </h3>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Seu cadastro foi confirmado com sucesso! 🎉
                <br />
                <br />
                Verifique seu <span className="font-semibold text-green-400">WhatsApp</span> para receber a mensagem de boas-vindas e começar a usar o Chat Delta.
              </p>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-400">
                  Redirecionando para a página inicial em instantes...
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
