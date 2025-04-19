<script>
  import { onMount } from 'svelte';
  import { extractYoutubeVideoId } from '$lib/youtube';
  import ToolNav from '$lib/components/ToolNav.svelte';
  
  let url = '';
  let comments = [];
  let isLoading = false;
  let errorMessage = '';

  async function processUrl() {
    errorMessage = '';
    isLoading = true;
    comments = [];
    
    try {
      const videoId = extractYoutubeVideoId(url);
      
      if (!videoId) {
        errorMessage = 'Invalid YouTube URL. Please enter a valid YouTube video URL.';
        return;
      }

      const response = await fetch(`/api/comments?videoId=${videoId}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      comments = data.comments;
    } catch (error) {
      console.error('Error processing URL:', error);
      errorMessage = error.message || 'An error occurred while fetching comments.';
    } finally {
      isLoading = false;
    }
  }

  function downloadComments() {
    if (comments.length === 0) return;

    const text = comments.map(comment => 
      `Author: ${comment.authorName}\nDate: ${new Date(comment.publishedAt).toLocaleString()}\nLikes: ${comment.likeCount}\n\n${comment.text}\n\n---\n`
    ).join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'youtube-comments.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<svelte:head>
  <title>YtToolBox - YouTube Comment Extractor | Free Online Tool</title>
  <meta name="description" content="Extract and download comments from any YouTube video with our free online tool. No signup required." />
  <meta property="og:title" content="YtToolBox - YouTube Comment Extractor | Free Online Tool" />
  <meta property="og:description" content="Extract and download comments from any YouTube video with our free online tool. No signup required." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yttoolbox.example.com/tools/comments-extractor" />
  <link rel="canonical" href="https://yttoolbox.example.com/tools/comments-extractor" />
</svelte:head>

<div class="max-w-5xl mx-auto px-4 py-8">
  <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">YouTube Comment Extractor</h1>
  <p class="text-center text-gray-600 mb-6">Extract and download comments from any YouTube video</p>

  <ToolNav currentTool="comments" />

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
    {:else if comments.length > 0}
      <div class="space-y-4">
        <button
          on:click={downloadComments}
          class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download All Comments
        </button>

        <div class="mt-6 space-y-4">
          {#each comments as comment}
            <div class="p-4 bg-gray-50 rounded-lg">
              <div class="flex items-start space-x-3">
                <img
                  src={comment.authorProfileUrl}
                  alt={comment.authorName}
                  class="w-8 h-8 rounded-full"
                />
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium text-gray-900">{comment.authorName}</h3>
                    <p class="text-xs text-gray-500">{formatDate(comment.publishedAt)}</p>
                  </div>
                  <p class="mt-1 text-sm text-gray-700">{@html comment.text}</p>
                  {#if comment.likeCount > 0}
                    <p class="mt-1 text-xs text-gray-500">
                      {comment.likeCount} {comment.likeCount === 1 ? 'like' : 'likes'}
                    </p>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <div class="text-center text-gray-500 py-12">
        <svg class="mx-auto h-8 w-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
        <p class="mt-2 text-sm">Enter a YouTube URL to get started</p>
      </div>
    {/if}
  </div>
</div> 