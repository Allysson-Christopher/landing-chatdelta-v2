"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, type Variants } from "framer-motion";

interface RevealOnScrollProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    variant?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "blur";
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
    children,
    width = "fit-content",
    variant = "fadeUp",
    delay = 0,
    duration = 0.5,
    className = "",
    once = true,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-50px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        } else if (!once) {
            mainControls.start("hidden");
        }
    }, [isInView, mainControls, once]);

    const getVariants = (): Variants => {
        switch (variant) {
            case "fadeUp":
                return {
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                };
            case "fadeDown":
                return {
                    hidden: { opacity: 0, y: -50 },
                    visible: { opacity: 1, y: 0 },
                };
            case "fadeLeft":
                return {
                    hidden: { opacity: 0, x: -50 },
                    visible: { opacity: 1, x: 0 },
                };
            case "fadeRight":
                return {
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 },
                };
            case "scale":
                return {
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                };
            case "blur":
                return {
                    hidden: { opacity: 0, filter: "blur(10px)" },
                    visible: { opacity: 1, filter: "blur(0px)" },
                };
            default:
                return {
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                };
        }
    };

    return (
        <div ref={ref} style={{ width }} className={className}>
            <motion.div
                variants={getVariants()}
                initial="hidden"
                animate={mainControls}
                transition={{ duration, delay, ease: "easeOut" }}
                className="h-full"
            >
                {children}
            </motion.div>
        </div>
    );
};

export default RevealOnScroll;
