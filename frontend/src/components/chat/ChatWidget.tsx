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
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
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

            {/* Messages area - Scrollable */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto chat-scroll p-4 space-y-6 min-h-0 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30"
            >
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
                            Velora Boutique
                        </h2>
                        <p className="text-white/60 text-base max-w-md">
                            Welcome to Velora Boutique! I'm here to help you with sizing, styling, orders, and any questions about our fashion collections.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Message List */}
                        {messages.map((message) => (
                            <ChatMessage
                                key={message.id}
                                sender={message.sender}
                                text={message.text}
                                timestamp={message.timestamp}
                                isNew={message.isNew}
                                isCached={message.isCached}
                            />
                        ))}

                        {/* Typing indicator - "Agent is typing..." */}
                        {isLoading && <TypingIndicator />}

                        {/* Scroll anchor for auto-scroll */}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Quick replies */}
            {showQuickReplies && <QuickReplies onSelect={sendMessage} disabled={isLoading} />}

            {/* Input area */}
            <div className="p-4 bg-black/20 backdrop-blur-md border-t border-white/10">
                <ChatInput
                    onSend={sendMessage}
                    disabled={isLoading || isInitializing}
                    placeholder={
                        isLoading
                            ? "Agent is typing..."
                            : isInitializing
                                ? "Initializing..."
                                : "Type your message... (Press Enter to send)"
                    }
                />
            </div>
        </div>
    );
}
