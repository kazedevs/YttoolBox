<script lang="ts">
  import { formatDate } from '$lib/utils';
  
  interface BlogData {
    title: string;
    date: string;
    author: string;
    readTime: string;
    content: string;
  }
  
  export let data: BlogData;
</script>

<article class="max-w-4xl mx-auto px-4 sm:px-8 py-12">
  <header class="mb-12">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{data.title}</h1>
    <div class="flex items-center text-gray-600 text-lg mb-8">
      <span>{formatDate(data.date)}</span>
      <span class="mx-3">•</span>
      <span>{data.readTime}</span>
      <span class="mx-3">•</span>
      <span>{data.author}</span>
    </div>
  </header>

  <div class="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-800 prose-a:text-blue-500 prose-a:hover:text-blue-600">
    {@html data.content}
  </div>

  <div class="mt-16 pt-8 border-t border-gray-200">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Share this article</h2>
    <div class="flex space-x-6">
      <a href="https://twitter.com/intent/tweet?text={encodeURIComponent(data.title)}&url={encodeURIComponent('https://yttoolbox.com/blog/mastering-youtube-growth')}" 
         class="text-blue-500 hover:text-blue-600 text-lg" 
         target="_blank" 
         rel="noopener noreferrer">
        Share on Twitter
      </a>
      <a href="https://www.linkedin.com/shareArticle?mini=true&url={encodeURIComponent('https://yttoolbox.com/blog/mastering-youtube-growth')}&title={encodeURIComponent(data.title)}" 
         class="text-blue-500 hover:text-blue-600 text-lg" 
         target="_blank" 
         rel="noopener noreferrer">
        Share on LinkedIn
      </a>
    </div>
  </div>
</article>

<style>
  :global(.prose) {
    max-width: none;
    margin: 0;
  }
  
  :global(.prose h2) {
    font-size: 1.75em;
    margin-top: 2em;
    margin-bottom: 1em;
    line-height: 1.3333333;
    color: #1a202c;
  }
  
  :global(.prose p) {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    line-height: 1.75;
    color: #4a5568;
  }
  
  :global(.prose ul) {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    padding-left: 1.625em;
  }
  
  :global(.prose li) {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
    line-height: 1.75;
    color: #4a5568;
  }
  
  :global(.prose strong) {
    font-weight: 600;
    color: #1a202c;
  }

  :global(.prose blockquote) {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    padding-left: 1em;
    border-left: 4px solid #e2e8f0;
    color: #4a5568;
  }

  :global(.prose hr) {
    margin-top: 3em;
    margin-bottom: 3em;
    border: 0;
    border-top: 1px solid #e2e8f0;
  }
</style> 