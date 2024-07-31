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
				'0calc': 'calc(0.8rem + 1vw)',
				'calc': 'calc(1rem + 1vw)',
				'2calc': 'calc(1.5rem + 1vw)',
				'3calc': 'calc(1.5rem + 13vw)',
				'4calc': 'calc(2rem + 2vw)',
				'5calc': 'calc(2.5rem + 2vw)',
				'6calc': 'calc(3.5rem + 8vw)',
				'7calc': 'calc(3.5rem + 3vw)',
				'8calc': 'calc(2rem + 1vw)',
				'9calc': 'calc(1rem + 2vw)',
				'10calc': 'calc(1rem + 2vw)',
				
			  },

			  colors: {
				primary:"#30BABA",
				secondary:"#1DD0D5",
				textblack:"#262a38"
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
