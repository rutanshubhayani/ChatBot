/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Outfit", "sans-serif"],
            },
            colors: {
                nova: {
                    bg: "#0f172a",
                    primary: "#3b82f6",
                    secondary: "#8b5cf6",
                    accent: "#f472b6",
                    surface: "rgba(30, 41, 59, 0.7)",
                },
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "float": "float 6s ease-in-out infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
