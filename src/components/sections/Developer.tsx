import React from "react";
import { Section } from "@/components/ui";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { Shield, Award } from "lucide-react";

const Developer: React.FC = () => {
  return (
    <Section bg="base" className="relative">
      <div className="container-custom">
        <RevealOnScroll variant="fadeUp" width="100%">
          <div className="text-center max-w-4xl mx-auto">
            {/* Ícone */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 mb-6">
              <Shield className="w-8 h-8 text-primary-500" />
            </div>

            {/* Título Principal */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Desenvolvido por um Delegado,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">para Delegados</span>
            </h2>

            {/* Descrição */}
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-lg sm:text-xl text-text-secondary">
                O Chat Delta foi criado por quem entende na prática os desafios da rotina policial.
              </p>

              {/* Card do Desenvolvedor */}
              <div className="mt-8 p-6 sm:p-8 rounded-2xl glass border border-white/5">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-primary-400" />
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary text-center">
                    Desenvolvido por um Delegado da
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-text-secondary font-medium">
                  Polícia Civil de Pernambuco
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </Section>
  );
};

export default Developer;
