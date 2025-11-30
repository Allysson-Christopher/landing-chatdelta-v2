import React from "react";
import { Check } from "lucide-react";
import { Button, Card, cn } from "@/components/ui";

interface PricingCardProps {
    plan: any;
    interactive?: boolean;
    billingCycle?: "monthly" | "biannual";
    onSelect?: (planType: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
    plan,
    interactive = false,
    billingCycle = "monthly",
    onSelect
}) => {
    const isHighlighted = plan.highlighted;
    const isEnterprise = plan.isEnterprise;

    // Get pricing based on cycle, fallback to monthly if specific cycle not available (e.g. free plan)
    const pricingData = plan.pricing[billingCycle] || plan.pricing.monthly;
    const price = pricingData.price;
    const savingsPercent = pricingData.savingsPercent;

    return (
        <Card
            className={cn(
                "flex flex-col h-full relative overflow-hidden transition-all duration-300",
                isHighlighted ? "border-primary-500/50 bg-primary-500/5 shadow-glow" : "bg-bg-surface/50",
                interactive && "hover:scale-105"
            )}
        >
            {isHighlighted && (
                <div className="absolute top-0 left-0 right-0 bg-primary-600 text-white text-xs font-bold text-center py-1">
                    MAIS POPULAR
                </div>
            )}

            <div className={cn("p-6 flex flex-col h-full", isHighlighted && "pt-8")}>
                <div className="mb-6">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-text-primary mb-2">{plan.name}</h3>
                        {savingsPercent && (
                            <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-1 rounded-full">
                                -{savingsPercent}% OFF
                            </span>
                        )}
                    </div>
                    <p className="text-text-secondary text-sm min-h-[40px]">{plan.description}</p>
                </div>

                <div className="mb-6">
                    {isEnterprise ? (
                        <div className="text-3xl font-bold text-text-primary">Sob Consulta</div>
                    ) : (
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-text-primary">
                                {price === 0 ? "Grátis" : `R$ ${price}`}
                            </span>
                            <span className="text-text-tertiary text-sm">/mês</span>
                        </div>
                    )}
                    {!isEnterprise && billingCycle === "biannual" && price > 0 && (
                        <div className="text-xs text-text-tertiary mt-1">
                            Cobrado semestralmente
                        </div>
                    )}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-text-secondary">
                            <Check className="w-5 h-5 text-accent shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <Button
                    variant={isHighlighted ? "primary" : "outline"}
                    className="w-full"
                    onClick={() => onSelect && onSelect(pricingData.planType || plan.type)}
                >
                    {plan.cta}
                </Button>
            </div>
        </Card>
    );
};

export default PricingCard;
