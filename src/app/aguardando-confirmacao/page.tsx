"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Loader2, XCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { getSubscription, APIRequestError } from "@/lib/api";
import type { SubscriptionResponse } from "@/lib/api";

export default function AguardandoConfirmacaoPage() {
  const router = useRouter();
  const [, setSubscription] = useState<SubscriptionResponse | null>(null);
  const [status, setStatus] = useState<"checking" | "approved" | "failed" | "timeout">("checking");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detectar preferência de movimento reduzido
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Buscar subscription ID e checkout URL do localStorage
    const subscriptionId = localStorage.getItem('pendingSubscriptionId');
    const savedCheckoutUrl = localStorage.getItem('pendingCheckoutUrl');

    if (!subscriptionId) {
      // Se não tem subscription pendente, redirecionar para home
      router.push('/');
      return;
    }

    // Salvar checkout URL no state
    setCheckoutUrl(savedCheckoutUrl);

    let currentPollInterval = 3000; // Intervalo inicial: 3s
    let pollCount = 0;
    let pollIntervalId: number | null = null;
    let timerInterval: number | null = null;
    let timeoutId: number | null = null;
    let isPageVisible = true;

    // Timer para contar tempo decorrido
    const startTimer = () => {
      timerInterval = window.setInterval(() => {
        if (isPageVisible) {
          setElapsedTime(prev => prev + 1);
        }
      }, 1000);
    };

    // Timeout após 2 minutos
    const startTimeout = () => {
      timeoutId = window.setTimeout(() => {
        setStatus('timeout');
        if (pollIntervalId) clearInterval(pollIntervalId);
        if (timerInterval) clearInterval(timerInterval);
      }, 120000); // 2 minutos
    };

    // Polling com backoff exponencial
    const poll = async () => {
      if (!isPageVisible) return;

      try {
        const sub = await getSubscription(subscriptionId);
        setSubscription(sub);
        pollCount++;

        // Verificar se pagamento foi aprovado
        if (sub.status === 'active') {
          setStatus('approved');
          if (pollIntervalId) clearInterval(pollIntervalId);
          if (timerInterval) clearInterval(timerInterval);
          if (timeoutId) clearTimeout(timeoutId);

          // Limpar localStorage
          localStorage.removeItem('pendingSubscriptionId');
          localStorage.removeItem('pendingSubscriptionPlan');
          localStorage.removeItem('pendingCheckoutUrl');
        } else if (sub.status === 'cancelled' || sub.status === 'payment_failed') {
          setStatus('failed');
          if (pollIntervalId) clearInterval(pollIntervalId);
          if (timerInterval) clearInterval(timerInterval);
          if (timeoutId) clearTimeout(timeoutId);

          localStorage.removeItem('pendingCheckoutUrl');
        } else {
          // Backoff exponencial: 3s → 5s → 10s → 15s
          if (pollCount === 5) {
            currentPollInterval = 5000;
            restartPolling();
          } else if (pollCount === 15) {
            currentPollInterval = 10000;
            restartPolling();
          } else if (pollCount === 25) {
            currentPollInterval = 15000;
            restartPolling();
          }
        }
      } catch (err) {
        console.error("Erro ao verificar status:", err);
        if (err instanceof APIRequestError) {
          setErrorMessage(err.message);
        }
      }
    };

    const restartPolling = () => {
      if (pollIntervalId) clearInterval(pollIntervalId);
      pollIntervalId = window.setInterval(poll, currentPollInterval);
    };

    // Page Visibility API
    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        poll();
      }
    };

    // Iniciar polling, timer e timeout
    startTimer();
    startTimeout();
    pollIntervalId = window.setInterval(poll, currentPollInterval);
    poll();

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      if (pollIntervalId) clearInterval(pollIntervalId);
      if (timerInterval) clearInterval(timerInterval);
      if (timeoutId) clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const openWhatsApp = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5581995970450";
    const message = encodeURIComponent("Olá! Preciso de ajuda com minha assinatura do Chat Delta.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-bg-base relative overflow-hidden flex flex-col">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-accent/5 pointer-events-none" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent/5"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: prefersReducedMotion ? 0 : Infinity,
          ease: "linear",
        }}
      />

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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-bg-surface rounded-2xl p-6 sm:p-10 border border-border shadow-2xl text-center">
            {status === "checking" && (
              <>
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="w-10 h-10 text-accent animate-spin" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                  Aguardando Confirmação
                </h1>

                <p className="text-text-secondary mb-6 text-lg">
                  Complete o pagamento para ativar sua assinatura
                  <br />
                  <span className="text-sm text-text-tertiary mt-2 block">
                    Esta página atualizará automaticamente quando o pagamento for confirmado
                  </span>
                </p>

                {checkoutUrl && (
                  <div className="mb-6">
                    <a
                      href={checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 py-4 px-8 bg-gradient-to-r from-primary-500 to-accent text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Abrir Página de Pagamento
                    </a>
                    <p className="text-text-tertiary text-sm mt-3">
                      Clique para pagar via Pix, cartão de crédito ou débito no Mercado Pago
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 text-text-tertiary text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Aguardando há {formatTime(elapsedTime)}</span>
                </div>

                {errorMessage && (
                  <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="text-yellow-500 text-sm">{errorMessage}</p>
                  </div>
                )}
              </>
            )}

            {status === "approved" && (
              <>
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-500" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                  Pagamento Confirmado! 🎉
                </h1>

                <p className="text-text-secondary mb-6 text-lg">
                  Seu pagamento foi aprovado com sucesso!
                </p>

                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-3 mb-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-green-400 mb-2">
                        Mensagem de Boas-Vindas Enviada! 📱
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        Enviamos uma mensagem de boas-vindas para o número de WhatsApp cadastrado.
                      </p>
                      <p className="text-text-tertiary text-xs mt-3">
                        💡 Se não receber em alguns minutos, verifique se o número está correto ou entre em contato com nosso suporte.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-bg-base/50 border border-border rounded-xl p-5">
                  <h4 className="font-semibold text-text-primary mb-3 text-sm">
                    Próximos Passos:
                  </h4>
                  <ul className="text-text-secondary text-sm space-y-2 text-left">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">✓</span>
                      <span>Abra o WhatsApp e procure pela mensagem do Chat Delta</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">✓</span>
                      <span>Siga as instruções para começar a usar seu chatbot</span>
                    </li>
                  </ul>
                </div>
              </>
            )}

            {status === "failed" && (
              <>
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="w-10 h-10 text-red-500" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                  Pagamento Não Aprovado
                </h1>

                <p className="text-text-secondary mb-8 text-lg">
                  Infelizmente seu pagamento não foi aprovado.
                  <br />
                  <span className="text-sm text-text-tertiary mt-2 block">
                    Por favor, tente novamente ou entre em contato conosco.
                  </span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/cadastro"
                    className="py-3 px-6 bg-gradient-to-r from-primary-500 to-accent text-white font-semibold rounded-lg hover:opacity-90 transition-all"
                  >
                    Tentar Novamente
                  </Link>
                  <button
                    onClick={openWhatsApp}
                    className="py-3 px-6 bg-bg-base text-text-primary border border-border rounded-lg hover:border-primary-500 transition-all"
                  >
                    Falar com Suporte
                  </button>
                </div>
              </>
            )}

            {status === "timeout" && (
              <>
                <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-yellow-500" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                  Tempo Esgotado
                </h1>

                <p className="text-text-secondary mb-8 text-lg">
                  Não conseguimos confirmar seu pagamento no momento.
                  <br />
                  <span className="text-sm text-text-tertiary mt-2 block">
                    Se você já realizou o pagamento, aguarde alguns minutos e entre em contato conosco.
                  </span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="py-3 px-6 bg-gradient-to-r from-primary-500 to-accent text-white font-semibold rounded-lg hover:opacity-90 transition-all"
                  >
                    Verificar Novamente
                  </button>
                  <button
                    onClick={openWhatsApp}
                    className="py-3 px-6 bg-bg-base text-text-primary border border-border rounded-lg hover:border-primary-500 transition-all"
                  >
                    Falar com Suporte
                  </button>
                </div>
              </>
            )}

            <div className="mt-8 pt-8 border-t border-border flex flex-col gap-3">
              <Link
                href="/"
                onClick={() => {
                  localStorage.removeItem('pendingSubscriptionId');
                  localStorage.removeItem('pendingSubscriptionPlan');
                  localStorage.removeItem('pendingCheckoutUrl');
                }}
                className="text-text-tertiary hover:text-text-primary transition-colors text-sm"
              >
                Voltar para a página inicial
              </Link>

              {status === "checking" && (
                <button
                  onClick={() => {
                    localStorage.removeItem('pendingSubscriptionId');
                    localStorage.removeItem('pendingSubscriptionPlan');
                    localStorage.removeItem('pendingCheckoutUrl');
                    router.push('/cadastro');
                  }}
                  className="text-red-500 hover:text-red-400 transition-colors text-sm"
                >
                  Cancelar e escolher outro plano
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
