<script>
  // Home page - landing page for YouTube Toolbox


</script>

<svelte:head>
  <title>YtToolBox| Free YouTube Thumbnail, Title & Tags Tools</title>
  <meta name="description" content="Free tools for YouTube content creators and viewers. Download thumbnails, extract titles, and generate effective tags for your videos." />
  <meta property="og:title" content="YtToolBox | Free YouTube Thumbnail, Title & Tags Tools" />
  <meta property="og:description" content="Free tools for YouTube content creators and viewers. Download thumbnails, extract titles, and generate effective tags for your videos." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yttoolbox.example.com/" />
  <link rel="canonical" href="https://yttoolbox.example.com/" />
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <!-- Hero Section -->
  <div class="text-center mb-16">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">YtToolBox</h1>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto">Free, fast, and easy-to-use tools for YouTube content creators and viewers</p>
  </div>
  
  <!-- Features Grid -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
    <!-- Thumbnail Tool -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div class="h-40 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white p-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-2">Thumbnail Downloader</h2>
        <p class="text-gray-600 mb-4">Download high-quality thumbnails from any YouTube video in multiple resolutions.</p>
        <a href="/tools" class="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
          Try it now
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
    
    <!-- Title Tool -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div class="h-40 bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white p-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-2">Title Extractor</h2>
        <p class="text-gray-600 mb-4">Extract and copy YouTube video titles with one click. Perfect for research and sharing.</p>
        <a href="/tools" class="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
          Try it now
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
    
    <!-- Tags Tool -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div class="h-40 bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white p-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      </div>
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-2">Tags Generator</h2>
        <p class="text-gray-600 mb-4">Generate optimized tags for your YouTube videos to improve discoverability and SEO.</p>
        <a href="/tools" class="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
          Try it now
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </div>
  
  <!-- CTA Section -->
  <div class="bg-blue-600 text-white rounded-lg shadow-md p-8 text-center mb-16">
    <h2 class="text-2xl md:text-3xl font-bold mb-4">Ready to enhance your YouTube experience?</h2>
    <p class="text-lg text-blue-100 mb-6 max-w-3xl mx-auto">All tools are free, run in your browser, and don't require any account or signup.</p>
    <a href="/tools" class="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300">
      Get Started Now
    </a>
  </div>
  
  <!-- FAQ Section -->
  <div class="max-w-4xl mx-auto mb-16 px-4">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
    
    <div class="space-y-8 text-gray-600">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">What does YtToolBox do?</h3>
        <p>YtToolBox helps you download YouTube thumbnails in multiple resolutions (HD, SD, etc.), extract video titles, and generate tags for your videos. Our tools are designed to be fast, simple, and easy to use for everyone.</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">How do I use the Thumbnail Downloader?</h3>
        <p>Simply copy any YouTube video URL, paste it into our tool, and we'll instantly generate thumbnails in different sizes for you. Click the download button next to the size you want, and the image will be saved to your device.</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Is it legal to download YouTube thumbnails?</h3>
        <p>While our tool is legal to use, YouTube thumbnails are still copyrighted by their creators. For personal use, there's typically no issue, but if you plan to use thumbnails in your own content, you should request permission from the original creator.</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Which devices are compatible with YtToolBox?</h3>
        <p>Our tools work on all modern browsers and devices, including desktops, laptops, Android phones, and tablets. Some features like automatic downloads may work differently on iOS devices due to system restrictions.</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Is reusing YouTube thumbnails SEO friendly?</h3>
        <p>Using unmodified YouTube thumbnails on your own content isn't ideal for SEO as these images are already indexed by search engines. If you need to use thumbnails for SEO purposes, consider modifying them to create unique content.</p>
      </div>
    </div>
  </div>
  
  <!-- Features Section -->
  <div class="max-w-4xl mx-auto mb-16">
    <h2 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">Why Choose YouTube Toolbox?</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex items-start">
        <div class="flex-shrink-0 mr-4">
          <div class="bg-blue-100 text-blue-600 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-bold text-gray-800 mb-1">Lightning Fast</h3>
          <p class="text-gray-600">Our tools are optimized for speed, with minimal loading times and instant results.</p>
        </div>
      </div>
      
      <div class="flex items-start">
        <div class="flex-shrink-0 mr-4">
          <div class="bg-blue-100 text-blue-600 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-bold text-gray-800 mb-1">Mobile Friendly</h3>
          <p class="text-gray-600">Use our tools on any device - desktop, tablet, or mobile phone with a responsive design.</p>
        </div>
      </div>
      
      <div class="flex items-start">
        <div class="flex-shrink-0 mr-4">
          <div class="bg-blue-100 text-blue-600 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-bold text-gray-800 mb-1">Privacy Focused</h3>
          <p class="text-gray-600">All processing happens in your browser. We don't store your URLs or any other data.</p>
        </div>
      </div>
      
      <div class="flex items-start">
        <div class="flex-shrink-0 mr-4">
          <div class="bg-blue-100 text-blue-600 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-bold text-gray-800 mb-1">Completely Free</h3>
          <p class="text-gray-600">All tools are 100% free to use with no hidden fees, subscriptions, or limitations.</p>
        </div>
      </div>
    </div>
  </div>
</div>


