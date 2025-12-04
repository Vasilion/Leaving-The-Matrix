/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				purple: {
					accent: '#a855f7'
				},
				cyan: {
					accent: '#00d9ff'
				},
				dark: {
					bg: '#0a0a0f',
					bg2: '#0f0f1a'
				}
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif']
			},
			backdropBlur: {
				glass: '12px'
			},
			boxShadow: {
				'glow-purple': '0 0 25px rgba(168, 85, 247, 0.4)',
				'glow-cyan': '0 0 30px rgba(0, 217, 255, 0.5)',
				'float': '0 10px 40px rgba(0, 0, 0, 0.4)'
			}
		}
	},
	plugins: []
};

