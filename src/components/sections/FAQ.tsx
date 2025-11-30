"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Section, cn } from "@/components/ui";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { FAQ as FAQ_DATA } from "@/constants/constants";

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <Section id="faq" bg="surface">
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-16">
                    <RevealOnScroll variant="fadeUp" width="100%">
                        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                            {FAQ_DATA.title}
                        </h2>
                    </RevealOnScroll>
                </div>

                <div className="space-y-4">
                    {FAQ_DATA.items.map((item: any, index: any) => (
                        <RevealOnScroll key={index} variant="fadeUp" delay={index * 0.05} width="100%">
                            <div
                                className={cn(
                                    "glass rounded-xl overflow-hidden transition-all duration-300",
                                    openIndex === index ? "border-primary-500/50 bg-white/5" : "hover:bg-white/5"
                                )}
                            >
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                                >
                                    <span className="text-lg font-semibold text-text-primary pr-8">
                                        {item.question}
                                    </span>
                                    <div
                                        className={cn(
                                            "flex-shrink-0 p-1 rounded-full transition-all duration-300",
                                            openIndex === index
                                                ? "bg-primary-500 text-white rotate-180"
                                                : "bg-white/10 text-text-tertiary"
                                        )}
                                    >
                                        {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 pt-0 text-text-secondary leading-relaxed border-t border-white/5 mt-2 pt-4">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default FAQ;
