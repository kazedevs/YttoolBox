import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // Use adapter-node for SSR (Server-Side Rendering)
    adapter: adapter(),
    
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/YtToolBox' : '',
      relative: false,
    },
    
    alias: {
      '$lib': './src/lib',
    },
  },
  
  preprocess: vitePreprocess(),
};

export default config;