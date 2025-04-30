<script>
  export let currentTool;
  
  const tools = [
    {
      name: 'thumbnail',
      label: 'Thumbnail Downloader',
      href: '/tools/thumbnail-downloader',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
    },
    {
      name: 'title',
      label: 'Title Extractor',
      href: '/tools/title-extractor',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      name: 'comments',
      label: 'Comments Extractor',
      href: '/tools/comments-extractor',
      icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
    },
    {
      name: 'pfp',
      label: 'Profile Picture Downloader',
      href: '/tools/pfp-downloader',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    },
    {
      name: 'banner',
      label: 'Banner Downloader',
      href: '/tools/banner-downloader',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
    },
    {
      name: 'audio',
      label: 'Audio Downloader',
      href: '/tools/audio-downloader',
      icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3'
    }
  ];
</script>

<div class="w-full overflow-x-auto">
  <div class="flex justify-start md:justify-center space-x-2 mb-6 min-w-max px-4 py-2">
    {#each tools as tool}
      <a
        href={tool.href}
        class="px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap min-w-[120px] text-center flex items-center justify-center gap-2 {currentTool === tool.name ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={tool.icon} />
        </svg>
        {tool.label}
      </a>
    {/each}
  </div>
</div>