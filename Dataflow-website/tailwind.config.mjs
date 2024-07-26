/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				helvetica: ['Helvetica', 'Arial', 'sans-serif'],
				'helvetica-neue': ['Helvetica Neue', 'Arial', 'sans-serif'],
			  },
			  fontSize: {
				'calc': 'calc(1rem + 1vw)',
				'2calc': 'calc(1.5rem + 1vw)',
				'3calc': 'calc(1.5rem + 13vw)',
				'4calc': 'calc(2rem + 2vw)',
				'5calc': 'calc(2.5rem + 2vw)',
				'6calc': 'calc(3.5rem + 8vw)',
			  },
			  keyframes: {
				fadeIn: {
				  '0%': { opacity: 0 },
				  '100%': { opacity: 1 },
				},
			  },
			  animation: {
				fadeIn: 'fadeIn 0.5s ease-in-out',
			  },
		},
	},
	plugins: [],
}