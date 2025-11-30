import Link from "next/link";
import { Mail, MessageCircle, ArrowLeft } from "lucide-react";

export default function ContatoPage() {
  const whatsapp = "5581995970450";
  const email = "suporte@chat.minhatech.com.br";

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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">Entre em Contato</h1>
          <p className="text-lg text-text-secondary mb-12">Estamos aqui para ajudar!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="p-8 rounded-2xl bg-bg-surface border border-border hover:border-primary-500 transition-all group">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">WhatsApp</h3>
              <p className="text-text-secondary text-sm mb-4">Fale conosco diretamente</p>
              <span className="text-accent font-medium">Abrir conversa →</span>
            </a>

            <a href={`mailto:${email}`} className="p-8 rounded-2xl bg-bg-surface border border-border hover:border-primary-500 transition-all group">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">E-mail</h3>
              <p className="text-text-secondary text-sm mb-4">Envie um e-mail</p>
              <span className="text-accent font-medium">Enviar e-mail →</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
