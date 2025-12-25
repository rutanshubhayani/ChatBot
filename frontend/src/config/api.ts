export const API_CONFIG = {
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
    timeout: 0,
    headers: {
        "Content-Type": "application/json",
    },
};

export const ENDPOINTS = {
    chat: "/api/chat",
    history: "/api/history",
};
