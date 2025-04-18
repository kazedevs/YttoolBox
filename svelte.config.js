import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // Use adapter-node for dynamic sites
    adapter: adapter(),

    // Set base path for GitHub Pages (optional)
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/YttoolBox' : '',
      relative: false,
    },

    alias: {
      $lib: './src/lib',
    },
  },
  
  preprocess: vitePreprocess(),
};

export default config;