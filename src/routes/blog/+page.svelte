<script>
  // List of blog posts with metadata
  const blogPosts = [
    {
      id: 'youtube-thumbnail-tips',
      title: 'How to Create Stunning YouTube Thumbnails: 10 Pro Tips',
      excerpt: 'Learn professional techniques to create eye-catching thumbnails that increase your click-through rate and grow your YouTube channel.',
      date: 'April 17, 2025',
      author: 'YtToolBox Team',
      readTime: '6 min read',
      image: '/blog/thumbnail-tips.jpg'
    },
    {
      id: 'youtube-title-optimization',
      title: 'YouTube Title Optimization: The Complete Guide for 2025',
      excerpt: 'Discover how to craft effective titles that rank higher in YouTube search and attract more viewers to your content.',
      date: 'April 10, 2025',
      author: 'YtToolBox Team',
      readTime: '8 min read',
      image: '/blog/title-optimization.jpg'
    },
    {
      id: 'youtube-tags-seo',
      title: 'YouTube Tags in 2025: Do They Still Matter for SEO?',
      excerpt: "An in-depth analysis of how YouTube tags affect your video's discoverability and whether they're still relevant for SEO.",
      date: 'April 3, 2025',
      author: 'YtToolBox Team',
      readTime: '7 min read',
      image: '/blog/tags-seo.jpg'
    }
  ];
</script>

<svelte:head>
  <title>YtToolBox Blog - YouTube Tips, Tricks, and Tutorials</title>
  <meta name="description" content="Explore our blog for the latest YouTube tips, tutorials, and strategies to improve your channel growth and video performance." />
  <meta property="og:title" content="YtToolBox Blog - YouTube Tips, Tricks, and Tutorials" />
  <meta property="og:description" content="Explore our blog for the latest YouTube tips, tutorials, and strategies to improve your channel growth and video performance." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yttoolbox.example.com/blog" />
  <link rel="canonical" href="https://yttoolbox.example.com/blog" />
</svelte:head>

<div class="max-w-5xl mx-auto px-4 py-8">
  <header class="mb-8 text-center">
    <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">YtToolBox Blog</h1>
    <p class="text-gray-600 md:max-w-2xl md:mx-auto">
      Explore our articles, guides, and tutorials about YouTube optimization, content creation, and growing your channel.
    </p>
  </header>

  <!-- Blog post list -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each blogPosts as post}
      <article class="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full transition-transform hover:shadow-md hover:-translate-y-1">
        <a href={`/blog/${post.id}`} class="block overflow-hidden h-48 bg-gray-100">
          <div class="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
        </a>
        <div class="p-5 flex-grow flex flex-col">
          <div class="mb-3 text-xs flex items-center text-gray-500">
            <span>{post.date}</span>
            <span class="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
          <h2 class="text-xl font-bold text-gray-800 mb-2 leading-tight">
            <a href={`/blog/${post.id}`} class="hover:text-blue-600 transition-colors">
              {post.title}
            </a>
          </h2>
          <p class="text-gray-600 text-sm mb-4 flex-grow">
            {post.excerpt}
          </p>
          <div class="mt-auto">
            <a 
              href={`/blog/${post.id}`} 
              class="inline-flex items-center text-blue-600 font-medium text-sm hover:text-blue-800"
            >
              Read More
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </article>
    {/each}
  </div>


</div>
