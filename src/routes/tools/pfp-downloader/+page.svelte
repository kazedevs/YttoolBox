<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import ToolNav from '$lib/components/ToolNav.svelte';
  import { fade } from 'svelte/transition';

  let channelUrl = '';
  let loading = false;
  let error: string | null = null;
  let channelInfo: {
    channelId: string;
    title: string;
    description: string;
    thumbnailUrl: string;
  } | null = null;

  onMount(() => {
    // Clear any existing state when component mounts
    channelUrl = '';
    loading = false;
    error = null;
    channelInfo = null;
  });

  async function handleSubmit() {
    if (!channelUrl) {
      error = 'Please enter a YouTube channel URL';
      return;
    }

    loading = true;
    error = null;
    channelInfo = null;

    try {
      const response = await fetch(`/api/channelinfo?channelUrl=${encodeURIComponent(channelUrl)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch channel information');
      }

      channelInfo = data;
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unexpected error occurred';
      console.error('Error fetching channel info:', e);
    } finally {
      loading = false;
    }
  }

  async function downloadImage() {
    if (!channelInfo?.thumbnailUrl) return;

    try {
      loading = true;
      error = null;

      // Fetch the image as a blob
      const response = await fetch(channelInfo.thumbnailUrl);
      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${channelInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_profile.jpg`;
      
      // Programmatically click the link
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      error = 'Failed to download image. Please try again.';
      console.error('Error downloading image:', e);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>YouTube Profile Picture Downloader - YT Toolbox</title>
  <meta name="description" content="Download high-quality profile pictures from any YouTube channel" />
</svelte:head>

<div class="max-w-5xl mx-auto px-4 py-8">
  <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">YouTube Profile Picture Downloader</h1>
  <p class="text-center text-gray-600 mb-6">Download high-quality profile pictures from any YouTube channel</p>

  <ToolNav currentTool="pfp" />

  <!-- URL Input -->
  <div class="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-4">
    <div class="flex flex-col space-y-2">
      <label for="channelUrl" class="text-sm font-medium text-gray-700">
        Enter YouTube Channel URL
      </label>
      <div class="flex">
        <input
          id="channelUrl"
          type="url"
          bind:value={channelUrl}
          placeholder="https://www.youtube.com/@username"
          class="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
        />
        <button
          on:click={handleSubmit}
          disabled={loading}
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
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
    {#if loading}
      <div class="flex justify-center items-center py-16">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    {:else if channelInfo}
      <div class="space-y-4">
        <div class="flex flex-col items-center space-y-4">
          <img
            src={channelInfo.thumbnailUrl}
            alt={`${channelInfo.title}'s YouTube profile picture`}
            class="w-32 h-32 rounded-full object-cover"
          />
          <div class="text-center">
            <h2 class="text-xl font-semibold text-gray-900">{channelInfo.title}</h2>
            <p class="text-sm text-gray-500 mt-1">{channelInfo.description}</p>
          </div>
          <button
            on:click={downloadImage}
            class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Profile Picture
          </button>
        </div>
      </div>
    {:else}
      <div class="text-center text-gray-500 py-12">
        <svg class="mx-auto h-8 w-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="mt-2 text-sm">Enter a YouTube URL to get started</p>
      </div>
    {/if}
  </div>
</div> 