import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PoliticaPrivacidadePage() {
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
          <h1 className="text-4xl font-bold text-text-primary mb-8">Política de Privacidade</h1>
          <p className="text-text-secondary mb-6">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">1. Informações que Coletamos</h2>
            <p className="text-text-secondary">Coletamos informações fornecidas por você ao usar nosso serviço, incluindo nome, e-mail e número de telefone.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">2. Como Usamos suas Informações</h2>
            <p className="text-text-secondary">Suas informações são utilizadas exclusivamente para fornecer e melhorar nossos serviços.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">3. Compartilhamento de Dados</h2>
            <p className="text-text-secondary">Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para prestação do serviço.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">4. Segurança</h2>
            <p className="text-text-secondary">Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">5. Seus Direitos</h2>
            <p className="text-text-secondary">Você tem direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">6. Contato</h2>
            <p className="text-text-secondary">Para questões sobre privacidade, entre em contato através do nosso suporte.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
