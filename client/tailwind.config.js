/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-primary': '#0a0a0a',
                'bg-secondary': '#1a1a1a',
                'bg-tertiary': '#141414',
                'bg-card': '#1f1f1f',
                'accent-red': '#dc2626',
                'accent-red-hover': '#ef4444',
                'accent-red-dark': '#b91c1c',
                'accent-yellow': '#fbbf24',
                'text-primary': '#ffffff',
                'text-secondary': '#9ca3af',
                'text-muted': '#6b7280',
            },
            fontFamily: {
                primary: ['Inter', 'sans-serif'],
                heading: ['Rajdhani', 'sans-serif'],
                display: ['Orbitron', 'sans-serif'],
            },
            boxShadow: {
                'glow': '0 0 20px rgba(220, 38, 38, 0.3)',
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            animation: {
                'scroll': 'scroll 40s linear infinite',
                'fadeIn': 'fadeIn 0.3s ease-out forwards',
                'fadeInUp': 'fadeInUp 0.4s ease-out forwards',
            },
        },
    },
    plugins: [],
}
