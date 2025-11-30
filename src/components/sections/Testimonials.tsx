import React from "react";
import { Star, Quote } from "lucide-react";
import { Section, Card } from "@/components/ui";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { TESTIMONIALS } from "@/constants/constants";

const Testimonials: React.FC = () => {
    return (
        <Section bg="surface" className="overflow-hidden">
            <div className="container-custom mb-16 text-center">
                <RevealOnScroll variant="fadeUp" width="100%">
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                        {TESTIMONIALS.title}
                    </h2>
                </RevealOnScroll>
            </div>

            {/* Marquee Effect Container */}
            <div className="relative w-full overflow-hidden mask-gradient-x">
                <div className="flex gap-6 animate-scroll hover:pause w-max">
                    {/* Duplicate items for seamless loop */}
                    {[...TESTIMONIALS.items, ...TESTIMONIALS.items].map((testimonial, index) => (
                        <div
                            key={index}
                            className="w-[350px] sm:w-[400px] flex-shrink-0"
                        >
                            <Card glow className="h-full p-8 flex flex-col bg-bg-base/50 border-white/5">
                                <div className="flex gap-1 mb-6">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                                    ))}
                                </div>

                                <div className="relative mb-6 flex-1">
                                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary-500/20 transform -scale-x-100" />
                                    <p className="text-text-secondary leading-relaxed relative z-10 pl-10 pr-4">
                                        {testimonial.testimonial}
                                        <Quote className="inline-block w-8 h-8 text-primary-500/20 ml-2 -mb-3" />
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                        {testimonial.avatar ? (
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        ) : (
                                            testimonial.name.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-bold text-text-primary">{testimonial.name}</div>
                                        <div className="text-sm text-text-tertiary">
                                            {testimonial.role} • {testimonial.location}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Testimonials;
