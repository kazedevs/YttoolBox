<script>
  import ToolNav from '$lib/components/ToolNav.svelte';
  import { getChannelBanner, extractYoutubeVideoId } from '$lib/youtube.js';
  
  let input = '';
  let channelData = null;
  let isLoading = false;
  let error = '';

  async function processBanner() {
    if (!input) {
      error = 'Please enter a channel URL or ID';
      return;
    }

    isLoading = true;
    error = '';
    channelData = null;
    
    try {
      // Extract channel ID from URL or verify UC... format
      const identifier = extractYoutubeVideoId(input) || input;
      channelData = await getChannelBanner(identifier);
      
      if (!channelData?.bannerUrl) {
        error = 'No banner found for this channel';
      }
    } catch (err) {
      error = err.message.includes('Failed to fetch') 
        ? 'YouTube services are temporarily unavailable. Please try again later.' 
        : err.message;
      // Add fallback suggestion
      if (err.message.includes('Failed to fetch')) {
        error += '<br><span class="text-sm">Tip: Try using a direct Channel ID (UC...) instead of handles</span>';
      }
    } finally {
      isLoading = false;
    }
  }

  // Add this function
  async function handleDownload(url, filename) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Download failed:', error);
      error = 'Failed to download banner';
    }
  }
</script>

<div class="max-w-5xl mx-auto px-4 py-8">
  <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">YouTube Banner Downloader</h1>
  <p class="text-center text-gray-600 mb-6">Download high-quality banner images from any YouTube channel</p>

  <ToolNav currentTool="banner" />

  <!-- Input Section -->
  <div class="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-4">
    <div class="flex flex-col space-y-2">
      <label for="channel-input" class="text-sm font-medium text-gray-700">
        Enter YouTube Channel URL or ID
      </label>
      <div class="flex">
        <input
          id="channel-input"
          type="text"
          bind:value={input}
          placeholder="Example: https://www.youtube.com/@ChannelName or UC..."
          class="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
        />
        <button
          on:click={processBanner}
          disabled={isLoading}
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
        >
          {isLoading ? 'Loading...' : 'Get Banner'}
        </button>
      </div>
    </div>
  </div>

  {#if isLoading}
    <div class="mt-8 flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  {/if}

  {#if error}
    <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
      {error}
    </div>
  {/if}

  {#if channelData?.bannerUrl}
    <div class="bg-white p-4 md:p-6 rounded-lg shadow-sm">
      <div class="mb-4">
        <h2 class="text-lg font-semibold">{channelData.username}</h2>
        <a href={channelData.channelUrl} target="_blank" class="text-blue-600 hover:underline text-sm">
          {channelData.channelUrl}
        </a>
      </div>
      <img 
        src={channelData.bannerUrl} 
        alt="Channel Banner" 
        class="w-full rounded-lg mb-4 border border-gray-200"
      />
      <div class="flex justify-end">
        <button
          on:click={() => handleDownload(channelData.bannerUrl, `${channelData.username}-banner.jpg`)}
          class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Download Banner
        </button>
      </div>
    </div>
  {/if}
</div>