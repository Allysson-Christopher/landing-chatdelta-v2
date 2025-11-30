"use client";


import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCheck, FileText } from "lucide-react";

interface Message {
    id: number;
    text?: string;
    isUser: boolean;
    time: string;
    type?: "text" | "file-pdf" | "file-docx";
    fileName?: string;
    fileSize?: string;
}

const WhatsAppShowcase: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    const conversation = [
        { text: "Olá! Gostaria de gerar um relatório final de inquérito.", isUser: true, delay: 1000, type: "text" },
        { text: "Claro! Faça o upload do PDF do inquérito policial.", isUser: false, delay: 2000, type: "text" },
        { 
            fileName: "inquerito_123_2024.pdf", 
            fileSize: "10 pág • 2.2 MB",
            isUser: true, 
            delay: 4000, 
            type: "file-pdf" 
        },
        { text: "Arquivo recebido! Analisando o inquérito... 📄", isUser: false, delay: 5500, type: "text" },
        { 
            fileName: "relatorio_final.docx", 
            fileSize: "19 KB",
            isUser: false, 
            delay: 8000, 
            type: "file-docx" 
        },
    ];

    useEffect(() => {
        let currentIndex = 0;
        let timeoutId: ReturnType<typeof setTimeout>;

        const addMessage = () => {
            if (currentIndex >= conversation.length) {
                // Reiniciar loop após um tempo
                timeoutId = setTimeout(() => {
                    setMessages([]);
                    currentIndex = 0;
                    addMessage();
                }, 5000);
                return;
            }

            const msg = conversation[currentIndex];

            // Se for mensagem do bot, mostrar "digitando" antes
            if (!msg.isUser) {
                setIsTyping(true);
                timeoutId = setTimeout(() => {
                    setIsTyping(false);
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: Date.now(),
                            text: msg.text,
                            isUser: msg.isUser,
                            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                            type: msg.type as any,
                            fileName: msg.fileName,
                            fileSize: msg.fileSize,
                        },
                    ]);
                    currentIndex++;
                    // Próxima mensagem
                    if (currentIndex < conversation.length) {
                        timeoutId = setTimeout(addMessage, conversation[currentIndex].delay - (conversation[currentIndex - 1]?.delay || 0));
                    } else {
                        addMessage(); // Trigger restart logic
                    }
                }, 1500);
            } else {
                // Mensagem do usuário
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now(),
                        text: msg.text,
                        isUser: msg.isUser,
                        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        type: msg.type as any,
                        fileName: msg.fileName,
                        fileSize: msg.fileSize,
                    },
                ]);
                currentIndex++;
                if (currentIndex < conversation.length) {
                    timeoutId = setTimeout(addMessage, conversation[currentIndex].delay - (conversation[currentIndex - 1]?.delay || 0));
                } else {
                    addMessage();
                }
            }
        };

        // Iniciar sequência
        timeoutId = setTimeout(addMessage, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    const renderMessage = (msg: Message) => {
        // Arquivo PDF
        if (msg.type === "file-pdf") {
            return (
                <div className="bg-white rounded-lg p-2 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-xs truncate text-black">
                                {msg.fileName}
                            </div>
                            <div className="text-[10px] text-gray-600 font-medium">
                                {msg.fileSize}
                            </div>
                        </div>
                        <button className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm">↓</span>
                        </button>
                    </div>
                </div>
            );
        }

        // Arquivo DOCX
        if (msg.type === "file-docx") {
            return (
                <div className="bg-white rounded-lg p-2 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-[10px]">W</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-xs truncate text-black">
                                {msg.fileName}
                            </div>
                            <div className="text-[10px] text-gray-600 font-medium">
                                {msg.fileSize}
                            </div>
                        </div>
                        <button className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-600 text-sm">→</span>
                        </button>
                    </div>
                </div>
            );
        }

        // Mensagem de texto normal
        return <p className="pr-16 pb-1">{msg.text}</p>;
    };

    return (
        <div className="w-full max-w-md mx-auto bg-[#0b141a] rounded-[30px] overflow-hidden shadow-2xl border-[6px] border-[#1f2c34] relative">
            {/* Header do WhatsApp */}
            <div className="bg-[#202c33] p-4 flex items-center gap-3 border-b border-[#2a3942]">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <img src="/assets/logo-delta-chat-new.svg" alt="Chat Delta" className="w-8 h-8" />
                </div>
                <div>
                    <div className="text-white font-semibold text-sm">Chat Delta</div>
                    <div className="text-[#8696a0] text-xs">Online</div>
                </div>
            </div>

            {/* Área de Mensagens */}
            <div className="h-[400px] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat p-4 overflow-y-auto flex flex-col gap-3 relative">
                <div className="absolute inset-0 bg-[#0b141a]/90 z-0" />

                <div className="relative z-10 flex flex-col gap-3">
                    <AnimatePresence mode="popLayout">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`w-[85%] ${msg.type?.startsWith("file") ? "p-2" : "p-2"} rounded-lg text-sm text-white relative shadow-sm ${
                                    msg.isUser
                                        ? "self-end bg-[#005c4b] rounded-tr-none"
                                        : "self-start bg-[#202c33] rounded-tl-none"
                                }`}
                            >
                                {renderMessage(msg)}
                                <span className="absolute bottom-1 right-2 text-[10px] text-[#8696a0] flex items-center gap-1">
                                    {msg.time}
                                    {msg.isUser && <CheckCheck className="w-3 h-3 text-[#53bdeb]" />}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="self-start bg-[#202c33] p-3 rounded-lg rounded-tl-none max-w-[85%]"
                        >
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                                <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                                <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Input Area (Fake) */}
            <div className="bg-[#202c33] p-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#2a3942] flex items-center justify-center">
                    <span className="text-[#8696a0]">+</span>
                </div>
                <div className="flex-1 bg-[#2a3942] h-9 rounded-lg px-3 flex items-center text-[#8696a0] text-sm">
                    Mensagem
                </div>
                <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center">
                    <span className="text-white">➤</span>
                </div>
            </div>
        </div>
    );
};

export default WhatsAppShowcase;
