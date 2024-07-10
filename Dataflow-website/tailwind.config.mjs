/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				helvetica: ['Helvetica', 'Arial', 'sans-serif'],
				'helvetica-neue': ['Helvetica Neue', 'Arial', 'sans-serif'],
			  }
		},
	},
	plugins: [],
}
