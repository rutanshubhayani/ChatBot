import { useRef, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { QuickReplies } from "./QuickReplies";
import { useChat } from "hooks/useChat";

export function ChatWidget() {
    const { messages, sendMessage, isLoading, isInitializing, handleNewChat } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, scrollToBottom]);

    const showQuickReplies = messages.length === 0 && !isLoading;

    return (
        <div className="flex flex-col h-full bg-transparent">
            {/* Header */}
            <ChatHeader onNewChat={messages.length > 0 ? handleNewChat : undefined} />

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto chat-scroll p-4 space-y-6 min-h-0 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {isInitializing ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-8 h-8 animate-spin text-nova-primary" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-float">
                        <div className="w-20 h-20 bg-gradient-to-br from-nova-primary to-nova-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-nova-primary/20">
                            <Loader2 className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="font-bold text-3xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            NovaChat
                        </h2>
                        <p className="text-white/60 text-base max-w-md">
                            Experience the future of communication. I'm here to assist you with anything you need.
                        </p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <ChatMessage
                            key={message.id}
                            sender={message.sender}
                            text={message.text}
                            timestamp={message.timestamp}
                            isNew={message.isNew}
                            isCached={message.isCached}
                        />
                    ))
                )}

                {/* Typing indicator */}
                {isLoading && <TypingIndicator />}

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {showQuickReplies && <QuickReplies onSelect={sendMessage} disabled={isLoading} />}

            {/* Input */}
            <div className="p-4 bg-black/20 backdrop-blur-md border-t border-white/10">
                <ChatInput
                    onSend={sendMessage}
                    disabled={isLoading || isInitializing}
                    placeholder={isLoading ? "Nova is thinking..." : "Type your message..."}
                />
            </div>
        </div>
    );
}
