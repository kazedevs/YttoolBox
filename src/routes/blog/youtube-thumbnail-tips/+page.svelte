<script>
  import { onMount } from 'svelte';
  import { siteUrl, getPageUrl } from '$lib/config/site';

  // Current page path
  const pagePath = '/blog/youtube-thumbnail-tips';
  const fullPageUrl = getPageUrl(pagePath);

  // Blog post metadata
  const post = {
    title: 'How to Create Stunning YouTube Thumbnails: 10 Pro Tips',
    date: 'April 17, 2025',
    author: 'YtToolBox Team',
    readTime: '6 min read',
    categories: ['Thumbnails', 'Design', 'YouTube Growth'],
    lastUpdated: 'April 18, 2025'
  };

  let shareUrl = '';
  
  onMount(() => {
    shareUrl = window.location.href;
  });
  
  // Function to generate share URLs
  function getShareUrl(platform) {
    const title = `${post.title} | YtToolBox Blog`;
    
    switch (platform) {
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
      default:
        return '';
    }
  }
</script>

<svelte:head>
  <title>{post.title} | YtToolBox Blog</title>
  <meta name="description" content="Learn professional techniques to create eye-catching thumbnails that increase your click-through rate and grow your YouTube channel." />
  <meta property="og:title" content="{post.title} | YtToolBox Blog" />
  <meta property="og:description" content="Learn professional techniques to create eye-catching thumbnails that increase your click-through rate and grow your YouTube channel." />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="{fullPageUrl}" />
  <meta property="article:published_time" content="2025-04-17T08:00:00+00:00" />
  <meta property="article:modified_time" content="2025-04-18T09:00:00+00:00" />
  <meta property="article:section" content="Thumbnails" />
  <meta property="article:tag" content="YouTube" />
  <meta property="article:tag" content="Thumbnails" />
  <meta property="article:tag" content="Design" />
  <link rel="canonical" href="{fullPageUrl}" />
  <style>
    .article-content h1 {
      font-size: 2.25rem !important;
      font-weight: 700 !important;
      margin-top: 2.5rem !important;
      margin-bottom: 1.5rem !important;
      color: #1f2937 !important;
      line-height: 1.2 !important;
    }
    
    .article-content h2 {
      font-size: 1.875rem !important;
      font-weight: 700 !important;
      margin-top: 2rem !important;
      margin-bottom: 1rem !important;
      color: #1f2937 !important;
      line-height: 1.3 !important;
    }
  </style>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8">
  <!-- Back to blog link -->
  <div class="mb-8">
    <a href="/blog" class="inline-flex items-center text-blue-600 hover:text-blue-800">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to all articles
    </a>
  </div>
  
  <!-- Article header -->
  <header class="mb-8">
    <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
    
    <div class="flex flex-wrap items-center text-sm text-gray-600 mb-4">
      <span class="mr-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {post.date}
      </span>
      <span class="mr-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {post.readTime}
      </span>
      <span class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        {post.author}
      </span>
    </div>
    
    <div class="flex flex-wrap gap-2 mb-6">
      {#each post.categories as category}
        <span class="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
          {category}
        </span>
      {/each}
    </div>
    
    <!-- Featured image placeholder -->
    <div class="w-full h-72 bg-blue-50 flex items-center justify-center mb-8 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    
    <!-- Social sharing buttons -->
    <div class="flex items-center space-x-4 border-t border-b border-gray-200 py-4">
      <span class="text-gray-600 text-sm">Share this article:</span>
      <a 
        href={getShareUrl('twitter')}
        target="_blank" 
        rel="noopener noreferrer"
        class="p-2 bg-black text-white rounded-full hover:bg-gray-800"
        aria-label="Share on Twitter"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a 
        href={getShareUrl('facebook')}
        target="_blank" 
        rel="noopener noreferrer"
        class="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"
        aria-label="Share on Facebook"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
        </svg>
      </a>
      <a 
        href={getShareUrl('linkedin')}
        target="_blank" 
        rel="noopener noreferrer"
        class="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        aria-label="Share on LinkedIn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
    </div>
  </header>
  
  <!-- Article content -->
  <div class="prose prose-blue max-w-none article-content">
    <p class="lead">
      Creating eye-catching thumbnails is one of the most important aspects of successful YouTube content. 
      A compelling thumbnail can significantly increase your click-through rate, helping your videos get more views. 
      In this guide, we'll share 10 professional tips to create stunning thumbnails that attract viewers.
    </p>
    
    <h2>1. Use High-Contrast Colors</h2>
    <p>
      Thumbnails with high contrast are more likely to stand out in YouTube's crowded search results and recommendations. 
      Use complementary colors that pop against each other. For example, blue and orange or purple and yellow create strong visual contrast.
    </p>
    
    <h2>2. Include a Clear, Readable Title</h2>
    <p>
      While your video will have a title below the thumbnail, including key words from your title directly in the thumbnail can increase clicks. 
      Make sure the text is large, readable, and contrasts well with the background.
    </p>
    
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-yellow-800">Pro Tip</h3>
          <div class="mt-2 text-sm text-yellow-700">
            <p>
              Limit text to 3-4 words maximum. Too much text makes thumbnails cluttered and hard to read, especially on mobile devices.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <h2>3. Show Emotion Through Facial Expressions</h2>
    <p>
      Human faces that display strong emotions like surprise, excitement, or curiosity can create an immediate connection with potential viewers. 
      These expressions trigger curiosity and make people want to find out more about what caused that reaction.
    </p>
    
    <h2>4. Use the Rule of Thirds</h2>
    <p>
      The rule of thirds is a basic photography principle that divides your image into nine equal segments using two horizontal lines and two vertical lines. 
      Placing the key elements of your thumbnail along these lines or at their intersections creates a more balanced and visually appealing composition.
    </p>
    
    <h2>5. Maintain Brand Consistency</h2>
    <p>
      Developing a consistent thumbnail style helps viewers instantly recognize your content. This could include:
    </p>
    <ul>
      <li>Using the same fonts</li>
      <li>Placing your logo in the same position</li>
      <li>Utilizing a consistent color scheme</li>
      <li>Applying similar layouts across your videos</li>
    </ul>
    
    <h2>6. Optimize for Multiple Screen Sizes</h2>
    <p>
      Remember that your thumbnails will be viewed on various devices, from smartphones to smart TVs. Make sure your key elements are visible even at small sizes. 
      Test how your thumbnail looks when scaled down to ensure it remains clear and compelling.
    </p>
    
    <h2>7. Use High-Quality Images</h2>
    <p>
      Blurry or pixelated thumbnails appear unprofessional and can deter potential viewers. Always use high-resolution images (at least 1280×720 pixels) 
      and make sure they're sharp and clear.
    </p>
    
    <h2>8. Create Visual Hierarchy</h2>
    <p>
      Guide the viewer's eye through your thumbnail by creating a clear visual hierarchy. Make the most important elements larger or brighter, 
      and use size, color, and positioning to direct attention where you want it.
    </p>
    
    <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-blue-800">Tool Tip</h3>
          <div class="mt-2 text-sm text-blue-700">
            <p>
              Use our <a href="/tools" class="underline">YouTube Thumbnail Downloader</a> to analyze successful competitors' thumbnails and learn from their design strategies.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <h2>9. Tell a Story or Create Curiosity</h2>
    <p>
      Your thumbnail should either tell a story or create curiosity that can only be satisfied by watching the video. 
      Use visual elements that spark questions in the viewer's mind or hint at the content without giving everything away.
    </p>
    
    <h2>10. A/B Test Your Thumbnails</h2>
    <p>
      Don't be afraid to change your thumbnail if it's not performing well. YouTube Studio allows you to update thumbnails without changing the video. 
      Try different designs to see which ones generate higher click-through rates.
    </p>
    
    <h2>Conclusion</h2>
    <p>
      Creating effective YouTube thumbnails is both an art and a science. By applying these 10 tips, you'll create more compelling thumbnails 
      that attract viewers and help your content stand out in YouTube's competitive landscape.
    </p>
    
    <p>
      Remember that what works best can vary depending on your niche and audience, so always monitor your analytics to see how your thumbnails are performing 
      and be ready to adjust your strategy accordingly.
    </p>
    
    <div class="bg-gray-100 p-6 rounded-lg my-8">
      <h3 class="text-lg font-bold text-gray-800 mb-2">Ready to create better thumbnails?</h3>
      <p class="mb-4 text-gray-700">
        Try our free YouTube thumbnail downloader tool to analyze high-performing videos in your niche and get inspiration for your own designs.
      </p>
      <a href="/tools" class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded">
        Try Our Tools
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  </div>
  
  <!-- Last updated info -->
  <div class="text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200">
    Last updated: {post.lastUpdated}
  </div>
  
  <!-- Author bio -->
  <div class="mt-8 pt-8 border-t border-gray-200">
    <h3 class="text-lg font-bold text-gray-800 mb-3">About the Author</h3>
    <div class="flex">
      <div class="mr-4 flex-shrink-0">
        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
      <div>
        <h4 class="font-medium text-gray-800">{post.author}</h4>
        <p class="text-sm text-gray-600 mt-1">
          The YtToolBox Team consists of YouTube experts, content creators, and digital marketers passionate about helping creators succeed on the platform.
        </p>
      </div>
    </div>
  </div>
  
  <!-- Related posts -->
  <div class="mt-12 pt-8 border-t border-gray-200">
    <h3 class="text-xl font-bold text-gray-800 mb-6">Related Articles</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a href="/blog/youtube-title-optimization" class="group block">
        <div class="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
          <div class="h-40 bg-gray-100 flex items-center justify-center text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div class="p-4">
            <p class="text-xs text-gray-500 mb-1">April 10, 2025 • 8 min read</p>
            <h4 class="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">YouTube Title Optimization: The Complete Guide for 2025</h4>
          </div>
        </div>
      </a>
      <a href="/blog/youtube-tags-seo" class="group block">
        <div class="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
          <div class="h-40 bg-gray-100 flex items-center justify-center text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div class="p-4">
            <p class="text-xs text-gray-500 mb-1">April 3, 2025 • 7 min read</p>
            <h4 class="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">YouTube Tags in 2025: Do They Still Matter for SEO?</h4>
          </div>
        </div>
      </a>
    </div>
  </div>
  

</div>
