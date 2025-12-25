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
        <div className={cn("flex gap-4 p-2 group", isUser ? "flex-row-reverse" : "")}>
            <div
                className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110",
                    isUser
                        ? "bg-gradient-to-br from-nova-secondary to-purple-600 text-white"
                        : "bg-gradient-to-br from-nova-primary to-blue-600 text-white",
                )}
            >
                {isUser ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>

            <div
                className={cn(
                    "p-4 rounded-2xl max-w-[80%] shadow-md transition-all duration-300",
                    isUser
                        ? "bg-nova-secondary/20 border border-nova-secondary/20 text-white rounded-tr-sm"
                        : "bg-white/5 border border-white/10 text-gray-100 rounded-tl-sm",
                )}
            >
                {isUser ? (
                    <p className="text-sm leading-relaxed">{text}</p>
                ) : (
                    <div className="text-sm prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
                        <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                )}
                {timestamp && (
                    <div className={cn("flex items-center gap-2 mt-2", isUser ? "justify-end" : "")}>
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
