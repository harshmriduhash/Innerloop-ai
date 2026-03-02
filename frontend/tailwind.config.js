/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#020817",
        foreground: "#e2e8f0",
        primary: {
          DEFAULT: "#38bdf8",
          foreground: "#0f172a"
        },
        muted: {
          DEFAULT: "#0b1120",
          foreground: "#64748b"
        }
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem"
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};

