import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermosUsoPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <header className="border-b border-border bg-bg-base/80 backdrop-blur-lg">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 bg-white rounded-lg p-1.5 transition-transform group-hover:scale-110 shadow-sm">
                <img src="/assets/logo-delta-chat-new.svg" alt="Chat Delta Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold text-text-primary">Chat Delta</span>
            </Link>
            <Link href="/" className="flex items-center gap-2 text-text-tertiary hover:text-text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Voltar</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container-custom py-12 sm:py-20">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h1 className="text-4xl font-bold text-text-primary mb-8">Termos de Uso</h1>
          <p className="text-text-secondary mb-6">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">1. Aceitação dos Termos</h2>
            <p className="text-text-secondary">Ao usar o Chat Delta, você concorda com estes termos de uso.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">2. Descrição do Serviço</h2>
            <p className="text-text-secondary">O Chat Delta é um chatbot inteligente para automatização de rotinas de trabalho via WhatsApp.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">3. Uso Adequado</h2>
            <p className="text-text-secondary">Você concorda em usar o serviço apenas para fins legais e de acordo com estes termos.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">4. Pagamento e Cancelamento</h2>
            <p className="text-text-secondary">Os planos pagos são cobrados mensalmente. Você pode cancelar a qualquer momento.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">5. Limitação de Responsabilidade</h2>
            <p className="text-text-secondary">O serviço é fornecido "como está". Não nos responsabilizamos por eventuais interrupções.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">6. Alterações nos Termos</h2>
            <p className="text-text-secondary">Podemos atualizar estes termos periodicamente. Notificaremos sobre mudanças significativas.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">7. Contato</h2>
            <p className="text-text-secondary">Para dúvidas sobre estes termos, entre em contato através do nosso suporte.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
