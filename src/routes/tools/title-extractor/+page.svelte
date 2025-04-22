<script>
  import { onMount } from 'svelte';
  import { extractYoutubeVideoId, getVideoTitle } from '$lib/youtube';
  import ToolNav from '$lib/components/ToolNav.svelte';
  
  let url = '';
  let videoId = null;
  let videoTitle = '';
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
      
      videoTitle = await getVideoTitle(videoId);
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
  <title>YtToolBox - YouTube Title Extractor | Free Online Tool</title>
  <meta name="description" content="Extract and copy YouTube video titles with our free online tool. No signup required." />
  <meta property="og:title" content="YtToolBox - YouTube Title Extractor | Free Online Tool" />
  <meta property="og:description" content="Extract and copy YouTube video titles with our free online tool. No signup required." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yttoolbox.com/tools/title-extractor" />
  <link rel="canonical" href="https://yttoolbox.com/tools/title-extractor" />
</svelte:head>

<div class="max-w-5xl mx-auto px-4 py-8">
  <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">YouTube Title Extractor</h1>
  <p class="text-center text-gray-600 mb-6">Extract and copy YouTube video titles easily</p>

  <ToolNav currentTool="title" />

  <!-- URL Input -->
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

  <!-- Results section -->
  <div class="bg-white p-4 md:p-6 rounded-lg shadow-sm">
    {#if isLoading}
      <div class="flex justify-center items-center py-16">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    {:else if videoTitle}
      <div class="space-y-4">
        <div class="p-4 bg-gray-50 rounded-lg">
          <p class="text-gray-700 break-words">{videoTitle}</p>
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

        <!-- Sharing buttons -->
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
                <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.964 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.72 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
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
      </div>
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