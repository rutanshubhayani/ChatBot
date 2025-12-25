import { useState, useEffect, useCallback, useOptimistic, useTransition } from "react";
import { Message } from "types";
import { chatAPI } from "api";
import { useToast } from "hooks/use-toast";

const STORAGE_KEY = "rhyri_session_id";

const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const [optimisticMessages, addOptimisticMessage] = useOptimistic(
        messages,
        (state, newMessage: Message) => [...state, newMessage],
    );

    // Load session
    useEffect(() => {
        const loadSession = async () => {
            const storedSessionId = localStorage.getItem(STORAGE_KEY);
            if (storedSessionId) {
                try {
                    const storedMessages = localStorage.getItem(`messages_${storedSessionId}`);
                    if (storedMessages) {
                        setSessionId(storedSessionId);
                        setMessages(JSON.parse(storedMessages));
                    }
                } catch (error) {}
            }
            setIsInitializing(false);
        };
        loadSession();
    }, []);

    const sendMessage = (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            sender: "user",
            text: text.trim(),
            timestamp: formatTime(new Date()),
            isNew: true,
        };

        startTransition(async () => {
            addOptimisticMessage(userMessage);

            try {
                const response = await chatAPI.sendMessage({
                    message: text.trim(),
                    sessionId: sessionId || undefined,
                });

                if (response.sessionId && response.sessionId !== sessionId) {
                    setSessionId(response.sessionId);
                    localStorage.setItem(STORAGE_KEY, response.sessionId);
                }

                const aiMessage: Message = {
                    id: `ai-${Date.now()}`,
                    sender: "ai",
                    text: response.reply,
                    timestamp: formatTime(new Date()),
                    isNew: true,
                    isCached: response.isCached,
                };

                setMessages((prev) => [...prev, userMessage, aiMessage]);
            } catch (error) {
                const errorMessage: Message = {
                    id: `error-${Date.now()}`,
                    sender: "ai",
                    text: error instanceof Error ? error.message : "An error occurred.",
                    timestamp: formatTime(new Date()),
                    isNew: true,
                };
                setMessages((prev) => [...prev, errorMessage]);
                toast({
                    title: "Error",
                    description: "Failed to send message.",
                    variant: "destructive",
                });
            }
        });
    };

    const handleNewChat = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setSessionId(null);
        setMessages([]);
        toast({ title: "New Chat", description: "Started a fresh conversation." });
    }, [toast]);

    return {
        messages: optimisticMessages,
        sendMessage,
        isLoading: isPending,
        isInitializing,
        handleNewChat,
    };
}
