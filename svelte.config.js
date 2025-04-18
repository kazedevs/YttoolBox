import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'url';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Using adapter-static for GitHub Pages deployment
		adapter: adapter({
			// GitHub Pages deployment
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true
		}),
		
		// Required for GitHub Pages to work properly with SvelteKit
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/YttoolBox' : '',
			relative: false
		},
		
		// Set up path aliases
		alias: {
			'$lib': './src/lib'
		}
	},
	
	// Enable both JS and Svelte preprocessing
	preprocess: vitePreprocess()
};

export default config;
