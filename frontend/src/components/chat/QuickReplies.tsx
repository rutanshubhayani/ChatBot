import { Button } from "components/ui/button";
import { Package, RefreshCw, Clock, CreditCard } from "lucide-react";

interface QuickRepliesProps {
    onSelect: (message: string) => void;
    disabled?: boolean;
}

const quickReplies = [
    {
        icon: Package,
        label: "Shipping",
        message: "What are your shipping options and delivery times?",
    },
    {
        icon: RefreshCw,
        label: "Returns",
        message: "What is your return policy?",
    },
    {
        icon: Clock,
        label: "Support Hours",
        message: "What are your customer support hours?",
    },
    {
        icon: CreditCard,
        label: "Payment",
        message: "What payment methods do you accept?",
    },
];

export function QuickReplies({ onSelect, disabled }: QuickRepliesProps) {
    return (
        <div className="flex flex-wrap gap-2 p-2 border-t">
            <span className="text-xs text-gray-500 w-full">Quick questions:</span>
            {quickReplies.map((reply) => (
                <Button
                    key={reply.label}
                    variant="outline"
                    size="sm"
                    disabled={disabled}
                    onClick={() => onSelect(reply.message)}
                    className="h-8 text-xs"
                >
                    {reply.label}
                </Button>
            ))}
        </div>
    );
}
