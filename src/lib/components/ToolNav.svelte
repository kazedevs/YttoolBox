<script>
  export let currentTool;
  
  const tools = [
    {
      name: 'thumbnail',
      label: 'Thumbnail Downloader',
      href: '/tools/thumbnail-downloader'
    },
    {
      name: 'title',
      label: 'Title Extractor',
      href: '/tools/title-extractor'  // Updated URL
    },
    {
      name: 'comments',
      label: 'Comments Extractor',
      href: '/tools/comments-extractor'
    },
    {
      name: 'pfp',
      label: 'Profile Picture Downloader',
      href: '/tools/pfp-downloader'
    }
  ];
</script>

<div class="flex justify-center space-x-2 mb-6">
  {#each tools as tool}
    <a
      href={tool.href}
      class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {currentTool === tool.name ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
    >
      {tool.label}
    </a>
  {/each}
</div>