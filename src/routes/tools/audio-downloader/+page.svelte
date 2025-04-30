<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import ToolNav from '$lib/components/ToolNav.svelte';
  import { fade } from 'svelte/transition';
  import { extractYoutubeVideoId, getVideoTitle } from '$lib/youtube';
  import { toast } from 'svelte-sonner';
  
  let videoUrl = '';
  let loading = false;
  let downloading = false;
  let error: string | null = null;
  let videoInfo: {
    videoId: string;
    title: string;
  } | null = null;
  let showSuccessMessage = false;

  onMount(() => {
    // Clear any existing state when component mounts
    videoUrl = '';
    loading = false;
    downloading = false;
    error = null;
    videoInfo = null;
    showSuccessMessage = false;
  });

  async function handleSubmit() {
    if (!videoUrl) {
      error = 'Please enter a YouTube video URL';
      return;
    }

    loading = true;
    downloading = false;
    error = null;
    videoInfo = null;
    showSuccessMessage = false;

    try {
      const videoId = extractYoutubeVideoId(videoUrl);
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      const title = await getVideoTitle(videoId);
      videoInfo = {
        videoId,
        title
      };
      toast.success('Video found! Click download to start.');
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unexpected error occurred';
      console.error('Error fetching video info:', e);
      toast.error(error);
    } finally {
      loading = false;
    }
  }

  async function downloadAudio() {
    if (!videoInfo?.videoId) return;

    try {
      downloading = true;
      loading = true;
      error = null;
      showSuccessMessage = false;

      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoUrl }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to download audio');
      }
      
      // Get the filename from the response headers or use a default
      const filename = response.headers.get('Content-Disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'audio.mp3';
      
      // Create a blob from the response
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      showSuccessMessage = true;
      toast.success('Download completed successfully!');
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unexpected error occurred';
      console.error('Error downloading audio:', e);
      toast.error(error);
    } finally {
      loading = false;
      downloading = false;
    }
  }
</script>

<svelte:head>
  <title>YouTube Audio Downloader - Download MP3 from YouTube Videos | YT Toolbox</title>
  <meta name="description" content="Free YouTube audio downloader. Convert and download audio from any YouTube video to MP3 format. Fast, easy, and no registration required." />
  <meta name="keywords" content="youtube audio downloader, youtube to mp3, download youtube audio, youtube music downloader, youtube mp3 converter" />
  <meta property="og:title" content="YouTube Audio Downloader - Download MP3 from YouTube Videos" />
  <meta property="og:description" content="Free YouTube audio downloader. Convert and download audio from any YouTube video to MP3 format. Fast, easy, and no registration required." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.yttoolbox.com/tools/audio-downloader" />
  <link rel="canonical" href="https://www.yttoolbox.com/tools/audio-downloader" />
</svelte:head>

<div class="max-w-5xl mx-auto px-4 py-8">
  <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">YouTube Audio Downloader</h1>
  <p class="text-center text-gray-600 mb-6">Download audio from any YouTube video in MP3 format</p>

  <ToolNav currentTool="audio" />

  <!-- URL Input -->
  <div class="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-4">
    <div class="flex flex-col space-y-2">
      <label for="videoUrl" class="text-sm font-medium text-gray-700">
        Enter YouTube Video URL
      </label>
      <div class="flex flex-col sm:flex-row gap-2">
        <input
          id="videoUrl"
          type="url"
          bind:value={videoUrl}
          placeholder="https://www.youtube.com/watch?v=..."
          class="flex-grow px-3 py-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
        />
        <button
          on:click={handleSubmit}
          disabled={loading || downloading}
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
        >
          {loading ? 'Processing...' : 'Process'}
        </button>
      </div>
      {#if error}
        <p class="text-red-600 text-xs">{error}</p>
      {/if}
    </div>
  </div>

  <!-- Results section -->
  <div class="bg-white p-4 md:p-6 rounded-lg shadow-sm">
    {#if loading && !downloading}
      <div class="flex justify-center items-center py-16">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    {:else if videoInfo}
      <div class="space-y-4">
        <div class="flex flex-col items-center space-y-4">
          <div class="text-center">
            <h2 class="text-xl font-semibold text-gray-900">{videoInfo.title}</h2>
          </div>
          <button
            on:click={downloadAudio}
            disabled={loading || downloading}
            class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {downloading ? 'Downloading...' : 'Download Audio'}
          </button>

          {#if downloading}
            <div class="w-full max-w-md space-y-4">
              <div class="flex justify-center">
                <img 
                  src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDByYmg5MGZ2NGNncHA0YzdweGtyN3FlODVwY21qdmlqanY1dmI5ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yatskcyU491mBojpG1/giphy.gif" 
                  alt="Dancing anime animation" 
                  class="w-24 h-24"
                />
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm text-gray-600">
                  <span>Downloading audio...</span>
                  <span>Please wait</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div class="bg-blue-600 h-2.5 rounded-full animate-pulse" style="width: 100%"></div>
                </div>
                <p class="text-xs text-gray-500 text-center">This may take a few minutes depending on the video length</p>
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <div class="text-center text-gray-500 py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        <p class="mt-2 text-sm">Enter a YouTube URL to get started</p>
      </div>
    {/if}

    {#if showSuccessMessage}
      <div class="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-center" transition:fade>
        <div class="flex flex-col items-center space-y-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-lg font-semibold text-green-800">Download Complete!</h3>
          <p class="text-green-600">Your audio has been downloaded successfully. Check your downloads folder.</p>
          <button
            on:click={() => showSuccessMessage = false}
            class="mt-2 text-sm text-green-600 hover:text-green-800"
          >
            Dismiss
          </button>
        </div>
      </div>
    {/if}
  </div>
</div> 