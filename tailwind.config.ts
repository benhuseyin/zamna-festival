import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#000000",
                foreground: "#ffffff",
                accent: {
                    DEFAULT: "#ffffff",
                    light: "#e5e5e5",
                    dark: "#1a1a1a",
                },
                glass: {
                    light: "rgba(255, 255, 255, 0.05)",
                    border: "rgba(255, 255, 255, 0.1)",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-outfit)", "system-ui", "sans-serif"],
            },
            backdropBlur: {
                xs: "2px",
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out",
                "fade-up": "fadeUp 0.6s ease-out",
                "scale-in": "scaleIn 0.3s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                scaleIn: {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
