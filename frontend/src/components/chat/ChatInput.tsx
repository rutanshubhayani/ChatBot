import { useState, useRef, useEffect } from "react";
import { Button } from "components/ui/button";
import { Textarea } from "components/ui/textarea";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
}

export function ChatInput({
    onSend,
    disabled = false,
    placeholder = "Type your message...",
}: ChatInputProps) {
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = () => {
        const trimmed = message.trim();
        if (trimmed && !disabled) {
            onSend(trimmed);
            setMessage("");
            // Reset textarea height
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [message]);

    const isValid = message.trim().length > 0;

    return (
        <div className="flex items-end gap-3 bg-white/5 border border-white/10 rounded-xl p-2 focus-within:bg-white/10 focus-within:border-white/20 transition-all duration-300">
            <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className="min-h-[24px] max-h-[120px] resize-none border-0 bg-transparent p-2 flex-1 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                rows={1}
            />
            <Button
                onClick={handleSubmit}
                disabled={disabled || !isValid}
                size="icon"
                className={`h-10 w-10 rounded-lg transition-all duration-300 ${isValid
                    ? "bg-nova-primary hover:bg-nova-primary/80 text-white shadow-lg shadow-nova-primary/25"
                    : "bg-white/10 text-white/30"
                    }`}
            >
                <ArrowUp className="h-5 w-5" />
                <span className="sr-only">Send</span>
            </Button>
        </div>
    );
}
