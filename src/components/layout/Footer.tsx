"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { FOOTER } from "@/constants/constants";

const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-bg-surface border-t border-border">
            <div className="container-custom">
                <div className="py-12 sm:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
                        {/* Logo */}
                        <div className="md:col-span-4 space-y-4">
                            <a href="/" className="inline-flex items-center gap-2 group">
                                <div className="relative w-10 h-10 bg-white rounded-lg p-1.5 transition-transform group-hover:scale-110 shadow-sm">
                                    <img
                                        src={FOOTER.logo.src}
                                        alt={FOOTER.logo.alt}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="text-xl font-bold text-text-primary">
                                    Chat Delta
                                </span>
                            </a>
                        </div>

                        {/* Links */}
                        <div className="md:col-span-3">
                            <h3 className="text-text-primary font-semibold mb-4">Links Rápidos</h3>
                            <ul className="space-y-3">
                                {["Início", "Como Funciona", "Planos", "FAQ"].map((item) => (
                                    <li key={item}>
                                        <button
                                            onClick={() => {
                                                const id = item === "Início" ? "#hero" : `#${item.toLowerCase().replace(" ", "-")}`;
                                                const element = document.querySelector(id);
                                                if (element) element.scrollIntoView({ behavior: "smooth", block: "center" });
                                            }}
                                            className="text-text-tertiary hover:text-text-primary transition-colors text-sm"
                                        >
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className="md:col-span-3">
                            <h3 className="text-text-primary font-semibold mb-4">Legal</h3>
                            <ul className="space-y-3">
                                {FOOTER.links.map((link: any) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-text-tertiary hover:text-text-primary transition-colors text-sm"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Suporte */}
                        <div className="md:col-span-2">
                            <h3 className="text-text-primary font-semibold mb-4">Suporte</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="mailto:chatdelta.atendimento@gmail.com"
                                        className="text-text-tertiary hover:text-text-primary transition-colors text-sm"
                                    >
                                        Email
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="py-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-text-tertiary text-sm text-center sm:text-left">
                        {FOOTER.copyright}
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-text-tertiary hover:text-text-primary transition-colors text-sm group"
                    >
                        Voltar ao topo
                        <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-primary-700/20 transition-colors">
                            <ArrowUp className="w-4 h-4" />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
