/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				purple: {
					accent: '#9d4edd'
				},
				cyan: {
					accent: '#00ffc6'
				},
				dark: {
					bg: '#0f0f1a',
					bg2: '#1a1a2e'
				}
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif']
			},
			backdropBlur: {
				glass: '12px'
			},
			boxShadow: {
				'glow-purple': '0 0 20px rgba(157, 78, 221, 0.3)',
				'glow-cyan': '0 0 20px rgba(0, 255, 198, 0.3)',
				'float': '0 10px 40px rgba(0, 0, 0, 0.3)'
			}
		}
	},
	plugins: []
};

