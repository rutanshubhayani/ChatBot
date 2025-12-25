import { Sparkles } from "lucide-react";

export function TypingIndicator() {
    return (
        <div className="flex gap-2 p-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
            </div>
            <div className="p-2 rounded bg-gray-100">
                <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75" />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150" />
                </div>
            </div>
        </div>
    );
}
