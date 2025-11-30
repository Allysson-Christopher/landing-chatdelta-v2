import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chat Delta - Chatbot Inteligente para Delegados",
  description: "Automatize sua rotina de trabalho com IA. Gere documentos policiais, consulte dados de processos e otimize seu atendimento via WhatsApp.",
  keywords: "chatbot, delegado, IA, documentos policiais, WhatsApp, automação",
  authors: [{ name: "Chat Delta" }],
  openGraph: {
    title: "Chat Delta - Chatbot Inteligente para Delegados",
    description: "Automatize sua rotina de trabalho com IA",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
