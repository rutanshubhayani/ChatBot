import { cn } from "lib/utils";
import { Sparkles, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
    sender: "user" | "ai";
    text: string;
    timestamp?: string;
    isNew?: boolean;
    isCached?: boolean;
}

export function ChatMessage({
    sender,
    text,
    timestamp,
    isNew = false,
    isCached,
}: ChatMessageProps) {
    const isUser = sender === "user";

    return (
        <div
            className={cn(
                "flex gap-4 p-2 group animate-fadeIn",
                isUser ? "flex-row-reverse" : ""
            )}
        >
            {/* Avatar */}
            <div
                className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 flex-shrink-0",
                    isUser
                        ? "bg-gradient-to-br from-nova-secondary to-purple-600 text-white"
                        : "bg-gradient-to-br from-nova-primary to-blue-600 text-white",
                )}
            >
                {isUser ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>

            {/* Message Content */}
            <div className="flex flex-col gap-1 max-w-[80%]">
                {/* Sender Label */}
                <span className={cn(
                    "text-[10px] font-medium",
                    isUser ? "text-nova-secondary/80 text-right" : "text-nova-primary/80"
                )}>
                    {isUser ? "You" : "Velora Boutique"}
                </span>

                {/* Message Bubble */}
                <div
                    className={cn(
                        "p-4 rounded-2xl shadow-md transition-all duration-300",
                        isUser
                            ? "bg-gradient-to-br from-nova-secondary/20 to-nova-secondary/10 border border-nova-secondary/30 text-white rounded-tr-sm"
                            : "bg-white/5 border border-white/10 text-gray-100 rounded-tl-sm hover:bg-white/10",
                    )}
                >
                    {isUser ? (
                        <p className="text-sm leading-relaxed">{text}</p>
                    ) : (
                        <div className="text-sm prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-p:my-2 prose-headings:my-3 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-code:text-nova-primary prose-strong:text-white">
                            <ReactMarkdown>{text}</ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* Timestamp and Status */}
                {timestamp && (
                    <div className={cn("flex items-center gap-2", isUser ? "justify-end" : "")}>
                        <span className="text-[10px] text-white/40">{timestamp}</span>
                        {!isUser && isCached && (
                            <span className="text-[10px] bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded border border-green-500/20">
                                Cached
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
