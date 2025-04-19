<script>
  import { onMount } from 'svelte';
  import { extractYoutubeVideoId, getThumbnailUrls, getVideoTitle, generateTags } from '$lib/youtube';
  
  let url = '';
  let videoId = null;
  let thumbnails = {};
  let videoTitle = '';
  let videoTags = [];
  let activeTab = 'thumbnail';
  let isLoading = false;
  let clipboardSupported = false;
  let errorMessage = '';
  
  onMount(() => {
    clipboardSupported = !!navigator.clipboard;
  });
  
  async function processUrl() {
    errorMessage = '';
    isLoading = true;
    
    try {
      videoId = extractYoutubeVideoId(url);
      
      if (!videoId) {
        errorMessage = 'Invalid YouTube URL. Please enter a valid YouTube video URL.';
        isLoading = false;
        return;
      }
      
      thumbnails = getThumbnailUrls(videoId);
      
      if (activeTab === 'title' || activeTab === 'tags') {
        videoTitle = await getVideoTitle(videoId);
        if (activeTab === 'tags') {
          videoTags = generateTags(videoTitle);
        }
      }
    } catch (error) {
      console.error('Error processing URL:', error);
      errorMessage = 'An error occurred while processing the URL.';
    } finally {
      isLoading = false;
    }
  }
  
  async function copyText(text) {
    if (clipboardSupported) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  }
  
  async function switchTab(tab) {
    activeTab = tab;
    
    if (videoId) {
      if (tab === 'title' && !videoTitle) {
        isLoading = true;
        videoTitle = await getVideoTitle(videoId);
        isLoading = false;
      } else if (tab === 'tags' && videoTags.length === 0) {
        isLoading = true;
        if (!videoTitle) {
          videoTitle = await getVideoTitle(videoId);
        }
        videoTags = generateTags(videoTitle);
        isLoading = false;
      }
    }
  }
  
  function downloadThumbnail(url, filename) {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename || 'youtube-thumbnail.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      });
  }
  
  // Generate share URLs for different platforms
  function getShareUrl(platform, content) {
    const baseUrl = window.location.origin + window.location.pathname;
    const youtubeUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : '';
    
    switch (platform) {
      case 'whatsapp':
        return `https://wa.me/?text=${encodeURIComponent(content + ' ' + youtubeUrl + '\n\nShared via YtToolBox: ' + baseUrl)}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}&url=${encodeURIComponent(youtubeUrl)}&via=YtToolBox`;
      case 'telegram':
        return `https://t.me/share/url?url=${encodeURIComponent(youtubeUrl)}&text=${encodeURIComponent(content + '\n\nShared via YtToolBox')}`;
      default:
        return '';
    }
  }
</script>

<svelte:head>
  {#if activeTab === 'thumbnail'}
    <title>YtToolBox - YouTube Thumbnail Downloader | Free Online Tool</title>
    <meta name="description" content="Download high quality thumbnails from any YouTube video with our free tool. Get HD, HQ, SD thumbnails with just one click." />
    <meta property="og:title" content="YtToolBox - YouTube Thumbnail Downloader | Free Online Tool" />
    <meta property="og:description" content="Download high quality thumbnails from any YouTube video with our free tool. Get HD, HQ, SD thumbnails with just one click." />
  {:else if activeTab === 'title'}
    <title>YtToolBox - YouTube Title Extractor | Free Online Tool</title>
    <meta name="description" content="Extract and copy YouTube video titles with our free online tool. No signup required." />
    <meta property="og:title" content="YtToolBox - YouTube Title Extractor | Free Online Tool" />
    <meta property="og:description" content="Extract and copy YouTube video titles with our free online tool. No signup required." />
  {:else if activeTab === 'tags'}
    <title>YtToolBox - YouTube Tags Generator | Free Online Tool</title>
    <meta name="description" content="Generate effective tags for your YouTube videos with our free online tool. Improve video SEO and discoverability." />
    <meta property="og:title" content="YtToolBox - YouTube Tags Generator | Free Online Tool" />
    <meta property="og:description" content="Generate effective tags for your YouTube videos with our free online tool. Improve video SEO and discoverability." />
  {/if}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yttoolbox.example.com/tools" />
  <link rel="canonical" href="https://yttoolbox.example.com/tools" />
</svelte:head>

<div class="max-w-5xl mx-auto px-4 py-8">
  <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">YtToolBox</h1>
  <p class="text-center text-gray-600 mb-6">Free tools for YouTube content creators and viewers</p>
  
  <div>
      <!-- URL Input - Always visible -->
      <div class="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-4">
        <div class="flex flex-col space-y-2">
          <label for="youtube-url" class="text-sm font-medium text-gray-700">
            Enter YouTube Video URL
          </label>
          <div class="flex">
            <input
              id="youtube-url"
              type="url"
              bind:value={url}
              placeholder="https://www.youtube.com/watch?v=..."
              class="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
            <button
              on:click={processUrl}
              disabled={isLoading}
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
            >
              {isLoading ? 'Processing...' : 'Process'}
            </button>
          </div>
          {#if errorMessage}
            <p class="text-red-600 text-xs">{errorMessage}</p>
          {/if}
        </div>
      </div>
      
      <!-- Tab navigation - Simplified -->
      <div class="flex mb-4 border-b">
        <button 
          class="flex-1 py-2 px-1 text-center text-sm font-medium border-b-2 {activeTab === 'thumbnail' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} transition-colors"
          on:click={() => switchTab('thumbnail')}
          aria-current={activeTab === 'thumbnail' ? 'page' : undefined}
        >
          <div class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Thumbnails</span>
          </div>
        </button>
        <button 
          class="flex-1 py-2 px-1 text-center text-sm font-medium border-b-2 {activeTab === 'title' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} transition-colors"
          on:click={() => switchTab('title')}
          aria-current={activeTab === 'title' ? 'page' : undefined}
        >
          <div class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Title</span>
          </div>
        </button>
        <button 
          class="flex-1 py-2 px-1 text-center text-sm font-medium border-b-2 {activeTab === 'tags' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} transition-colors"
          on:click={() => switchTab('tags')}
          aria-current={activeTab === 'tags' ? 'page' : undefined}
        >
          <div class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span>Tags</span>
          </div>
        </button>
      </div>

      <!-- Results section -->
      <div class="bg-white p-4 md:p-6 rounded-lg shadow-sm">
        {#if isLoading}
          <div class="flex justify-center items-center py-16">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        {:else if videoId}
          <!-- Thumbnail Downloader -->
          {#if activeTab === 'thumbnail'}
            <div class="space-y-4">
              {#each Object.entries(thumbnails) as [key, thumb]}
                <div class="border rounded-lg overflow-hidden">
                  <div class="p-3 bg-gray-50 border-b flex justify-between items-center">
                    <h3 class="text-sm font-medium">{key.toUpperCase()} ({thumb.label})</h3>
                    <button
                      on:click={() => downloadThumbnail(thumb.url, `youtube-${videoId}-${key}.jpg`)}
                      class="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </button>
                  </div>
                  <div class="p-3">
                    <img 
                      src={thumb.url} 
                      alt={`${key} thumbnail`} 
                      class="w-full h-auto rounded border border-gray-100"
                      loading="lazy"
                      on:error|once={() => {
                        const fallbackUrl = 'https://via.placeholder.com/640x480?text=Image+Not+Available';
                        const target = document.getElementById(`thumbnail-${key}`);
                        if (target) {
                          target.setAttribute('src', fallbackUrl);
                          target.classList.add('p-12');
                        }
                      }}
                      id={`thumbnail-${key}`}
                    />
                  </div>
                </div>
              {/each}
            </div>
            
            <!-- Sharing buttons for thumbnails -->
            <div class="mt-4 pt-3 border-t">
              <p class="text-sm font-medium text-gray-700 mb-2">Share this thumbnail:</p>
              <div class="flex space-x-2">
                <a 
                  href={getShareUrl('whatsapp', `Check out this YouTube thumbnail from video ${videoId}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  aria-label="Share on WhatsApp"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.72 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
                  </svg>
                </a>
                <a 
                  href={getShareUrl('twitter', `Check out this YouTube thumbnail from video ${videoId}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2 bg-black text-white rounded hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
                  aria-label="Share on X"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a 
                  href={getShareUrl('telegram', `Check out this YouTube thumbnail from video ${videoId}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  aria-label="Share on Telegram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
              </div>
            </div>
          
          <!-- Title Extractor -->
          {:else if activeTab === 'title'}
            {#if videoTitle}
              <div class="p-3 bg-gray-50 border rounded-lg mb-3">
                <p class="text-sm break-words">{videoTitle}</p>
              </div>
              <button
                on:click={() => copyText(videoTitle)}
                class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {clipboardSupported ? 'Copy to Clipboard' : 'Select to Copy'}
              </button>
              
              <!-- Sharing buttons for title -->
              <div class="mt-4 pt-3 border-t">
                <p class="text-sm font-medium text-gray-700 mb-2">Share this title:</p>
                <div class="flex space-x-2">
                  <a 
                    href={getShareUrl('whatsapp', `YouTube video title: ${videoTitle}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    aria-label="Share on WhatsApp"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.72 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
                    </svg>
                  </a>
                  <a 
                    href={getShareUrl('twitter', `YouTube video title: ${videoTitle}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-2 bg-black text-white rounded hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
                    aria-label="Share on X"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a 
                    href={getShareUrl('telegram', `YouTube video title: ${videoTitle}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    aria-label="Share on Telegram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                </div>
              </div>
            {:else}
              <p class="text-gray-500 text-sm">No title found for this video.</p>
            {/if}
          
          <!-- Tags Generator -->
          {:else if activeTab === 'tags'}
            {#if videoTags.length > 0}
              <div class="p-3 bg-gray-50 border rounded-lg mb-3">
                <div class="flex flex-wrap gap-1">
                  {#each videoTags as tag}
                    <span class="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">{tag}</span>
                  {/each}
                </div>
              </div>
              <div class="mb-3">
                <p class="text-xs text-gray-500 mb-1">Tags as comma-separated list:</p>
                <div class="p-2 bg-gray-50 border rounded-lg break-words">
                  <code class="text-xs">{videoTags.join(', ')}</code>
                </div>
              </div>
              <button
                on:click={() => copyText(videoTags.join(', '))}
                class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {clipboardSupported ? 'Copy Tags to Clipboard' : 'Select to Copy'}
              </button>
              
              <!-- Sharing buttons for tags -->
              <div class="mt-4 pt-3 border-t">
                <p class="text-sm font-medium text-gray-700 mb-2">Share these tags:</p>
                <div class="flex space-x-2">
                  <a 
                    href={getShareUrl('whatsapp', `YouTube tags: ${videoTags.join(', ')}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    aria-label="Share on WhatsApp"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.72 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
                    </svg>
                  </a>
                  <a 
                    href={getShareUrl('twitter', `YouTube tags: ${videoTags.slice(0, 5).join(', ')}...`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-2 bg-black text-white rounded hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
                    aria-label="Share on X"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a 
                    href={getShareUrl('telegram', `YouTube tags: ${videoTags.join(', ')}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    aria-label="Share on Telegram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                </div>
              </div>
            {:else}
              <p class="text-gray-500 text-sm">No tags could be generated for this video.</p>
            {/if}
          {/if}
        {:else}
          <div class="text-center text-gray-500 py-12">
            <svg class="mx-auto h-8 w-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <p class="mt-2 text-sm">Enter a YouTube URL to get started</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
