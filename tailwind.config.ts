import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			animation: {
				'spin-slow': 'spin 2s linear infinite',
			},
			spacing: {
				'4.5': '18px',
			},
		},
		container: {
			center: true,
		},
		fontFamily: {
			'proxima-nova': ['proxima-nova', ...defaultTheme.fontFamily.sans],
			'proxima-nova-cond': [
				'proxima-nova-condensed',
				...defaultTheme.fontFamily.sans,
			],
		},
		colors: {
			current: 'currentColor',
			transparent: 'transparent',
			white: '#f9f9f9',
			grey: {
				DEFAULT: '#e9e9e9',
				dark: '#292929',
			},
			black: '#000',
			blue: {
				light: '#dCe5eB',
				mid: '#184792',
				'3/4': '#05104d',
				dark: '#02082c',
			},
			red: {
				DEFAULT: '#ff5555',
				dark: '#ce1717',
			},
		},
	},
	plugins: [],
};
export default config;
