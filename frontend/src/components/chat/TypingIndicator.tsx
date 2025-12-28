import { Sparkles } from "lucide-react";

export function TypingIndicator() {
    return (
        <div className="flex gap-4 p-2 animate-fadeIn">
            {/* AI Avatar */}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br from-nova-primary to-blue-600 text-white">
                <Sparkles className="w-5 h-5" />
            </div>

            {/* Typing bubble */}
            <div className="flex flex-col gap-1">
                <div className="p-4 rounded-2xl rounded-tl-sm bg-white/5 border border-white/10 shadow-md">
                    <div className="flex gap-1.5 items-center">
                        <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
                <span className="text-[10px] text-white/40 ml-1">Agent is thinking...</span>
            </div>
        </div>
    );
}
