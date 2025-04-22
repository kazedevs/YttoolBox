<script>
  const tools = [
    {
      title: 'Thumbnail Downloader',
      description: 'Download high-quality thumbnails from any YouTube video',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      href: '/tools/thumbnail-downloader'
    },
    {
      title: 'Title Extractor',
      description: 'Extract and copy YouTube video titles easily',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      href: '/tools/title-extractor'
    },
    {
      title: 'Comments Extractor',
      description: 'Extract and download comments from any YouTube video',
      icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
      href: '/tools/comments-extractor'
    },
    {
      title: 'PFP Downloader',
      description: 'Download high-quality profile pictures from any YouTube channel',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      href: '/tools/pfp-downloader'
    }
  ];
</script>

<svelte:head>
  <title>YtToolBox - Free YouTube Tools | Thumbnail, Title, and Tags</title>
  <meta name="description" content="Free tools for YouTube content creators and viewers. Download thumbnails, extract titles, and generate tags." />
  <meta property="og:title" content="YtToolBox - Free YouTube Tools | Thumbnail, Title, and Tags" />
  <meta property="og:description" content="Free tools for YouTube content creators and viewers. Download thumbnails, extract titles, and generate tags." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yttoolbox.com/tools" />
  <link rel="canonical" href="https://yttoolbox.com/tools" />
</svelte:head>

<div class="max-w-5xl mx-auto px-4 py-8">
  <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">YtToolBox</h1>
  <p class="text-center text-gray-600 mb-6">Free tools for YouTube content creators and viewers</p>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {#each tools as tool}
      <a 
        href={tool.href} 
        class="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={tool.icon} />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{tool.title}</h2>
        <p class="text-gray-600">{tool.description}</p>
      </a>
    {/each}
  </div>
</div>