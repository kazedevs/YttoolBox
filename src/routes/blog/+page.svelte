<script lang="ts">
  import { formatDate } from '$lib/utils/date';
  
  // Sample blog posts data - in a real app, this would come from a database or CMS
  const blogPosts = [
    {
      slug: 'mastering-youtube-growth',
      title: 'Mastering YouTube Growth: Build, Scale, and Succeed—Even Alone',
      date: new Date('2024-03-20'),
      author: 'Yttoolbox Team',
      readTime: '15 min read',
      excerpt: "Learn proven strategies to grow your YouTube channel from scratch, optimize your content, and build a sustainable audience—even if you're working solo."
    }
  ];
  
  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/images/placeholder.svg';
  }
</script>

<svelte:head>
  <title>Blog - Yttoolbox</title>
  <meta name="description" content="Latest insights and guides on YouTube growth, content creation, and channel optimization." />
  <meta property="og:title" content="Blog | YtToolBox" />
  <meta property="og:description" content="Explore our blog for insights on YouTube growth, content creation, monetization strategies, and more. Expert tips for content creators." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yttoolbox.com/blog" />
  <link rel="canonical" href="https://yttoolbox.com/blog" />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <header class="text-center mb-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
    <p class="text-xl text-gray-600">Latest insights and guides on YouTube growth</p>
  </header>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each blogPosts as post}
      <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="flex items-center text-sm text-gray-500 mb-2">
            <span>{formatDate(post.date)}</span>
            <span class="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">
            <a href="/blog/{post.slug}" class="hover:text-blue-600 transition-colors duration-200">
              {post.title}
            </a>
          </h2>
          <p class="text-gray-600 mb-4">{post.excerpt}</p>
          <a
            href="/blog/{post.slug}"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Read more
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </article>
    {/each}
  </div>
  
  <div class="mt-16 text-center">
    <h2 class="text-2xl font-semibold text-gray-900 mb-4">Stay Updated</h2>
    <p class="text-gray-600 mb-6">Subscribe to our newsletter for the latest YouTube growth tips and strategies.</p>
    <a
      href="/subscribe"
      class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
    >
      Subscribe Now
    </a>
  </div>
</div>

<style>
  /* Add any additional styles here */
</style> 