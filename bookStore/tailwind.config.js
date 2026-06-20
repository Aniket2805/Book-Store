/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#e6ecff",
          200: "#c9d9ff",
          300: "#a8baff",
          400: "#8094ff",
          500: "#5b6aff",
          600: "#4349ff",
          700: "#3535f5",
          800: "#2a2add",
          900: "#1f1fa8",
        },
        secondary: {
          50: "#fff5f5",
          100: "#ffe0e0",
          200: "#ffc2c2",
          300: "#ff9c9c",
          400: "#ff6b6b",
          500: "#ff3b3b",
          600: "#ff1d1d",
          700: "#e01111",
          800: "#b80e0e",
          900: "#8b0a0a",
        },
        accent: {
          50: "#f5f7ff",
          100: "#e6ebff",
          200: "#c9d9ff",
          300: "#a8baff",
          400: "#7a8aff",
          500: "#5b6aff",
          600: "#4349ff",
          700: "#3535f5",
          800: "#2a2add",
          900: "#1f1fa8",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "gradient-secondary": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "gradient-light": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "gradient-warm": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(99, 102, 241, 0.3)",
        "glow-md": "0 0 20px rgba(99, 102, 241, 0.4)",
        "glow-lg": "0 0 30px rgba(99, 102, 241, 0.5)",
        "card": "0 10px 30px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 20px 40px rgba(0, 0, 0, 0.15)",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
