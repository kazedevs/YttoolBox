<script lang="ts">
  import '../app.css';
  import GoogleAnalytics from '$lib/components/GoogleAnalytics.svelte';
  let isMenuOpen = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  
  function closeMenu() {
    isMenuOpen = false;
  }
  
  // Generate share URLs for different platforms
  function getShareUrl(platform) {
    // This will be set on the client-side
    let pageUrl = '';
    let title = 'Check out YtToolBox - Free YouTube tools for content creators and viewers';
    
    if (typeof window !== 'undefined') {
      pageUrl = window.location.href;
    } else {
      pageUrl = 'https://yttoolbox.example.com';
    }
    
    switch (platform) {
      case 'whatsapp':
        return `https://wa.me/?text=${encodeURIComponent(title + ' ' + pageUrl)}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}`;
      case 'telegram':
        return `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
      case 'email':
        return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Check out this page: ' + pageUrl)}`;
      default:
        return '';
    }
  }
</script>

<GoogleAnalytics />

<svelte:head>
  <!-- Google Analytics is now handled by the GoogleAnalytics component -->
</svelte:head>

<div class="min-h-screen flex flex-col bg-gray-50">
  <!-- Header with navigation -->
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <a href="/" class="text-xl font-extrabold text-blue-600 hover:text-blue-800 transition-colors" on:click={closeMenu}>
          YtToolBox
        </a>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <a href="/" class="text-gray-700 hover:text-blue-600 font-medium">Home</a>
          <a href="/tools" class="text-gray-700 hover:text-blue-600 font-medium">Tools</a>
          <a href="/blog" class="text-gray-700 hover:text-blue-600 font-medium">Blog</a>
          <a href="/about" class="text-gray-700 hover:text-blue-600 font-medium">About</a>
          <a href="/contact" class="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
          <a href="/privacy" class="text-gray-700 hover:text-blue-600 font-medium">Privacy</a>
        </nav>
        
        <!-- Mobile menu button -->
        <button 
          class="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none" 
          on:click={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Navigation -->
      {#if isMenuOpen}
        <div class="md:hidden py-3 border-t border-gray-200">
          <a href="/" class="block py-2 text-gray-700 hover:text-blue-600 font-medium" on:click={closeMenu}>Home</a>
          <a href="/tools" class="block py-2 text-gray-700 hover:text-blue-600 font-medium" on:click={closeMenu}>Tools</a>
          <a href="/blog" class="block py-2 text-gray-700 hover:text-blue-600 font-medium" on:click={closeMenu}>Blog</a>
          <a href="/about" class="block py-2 text-gray-700 hover:text-blue-600 font-medium" on:click={closeMenu}>About</a>
          <a href="/contact" class="block py-2 text-gray-700 hover:text-blue-600 font-medium" on:click={closeMenu}>Contact</a>
          <a href="/privacy" class="block py-2 text-gray-700 hover:text-blue-600 font-medium" on:click={closeMenu}>Privacy</a>
        </div>
      {/if}
    </div>
  </header>
  
  <!-- Main content -->
  <main class="flex-grow">
    <slot />
  </main>
  
  <!-- Footer -->
  <footer class="bg-white py-6 border-t border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row md:justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p class="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} YtToolBox. Not affiliated with YouTube.
          </p>
          
          <!-- Social sharing buttons -->
          <div class="mt-2">
            <p class="text-gray-500 text-xs mb-2">Share this page:</p>
            <div class="flex space-x-4">
              <a 
                href={getShareUrl('whatsapp')}
                target="_blank"
                rel="noopener noreferrer"
                class="p-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                aria-label="Share on WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.964 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.72 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
                </svg>
              </a>
              <a 
                href={getShareUrl('twitter')}
                target="_blank"
                rel="noopener noreferrer"
                class="p-1.5 bg-black text-white rounded hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
                aria-label="Share on X"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href={getShareUrl('telegram')}
                target="_blank"
                rel="noopener noreferrer"
                class="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-label="Share on Telegram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
              <a 
                href={getShareUrl('facebook')}
                target="_blank"
                rel="noopener noreferrer"
                class="p-1.5 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
                aria-label="Share on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
                </svg>
              </a>
              <a 
                href={getShareUrl('email')}
                class="p-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
                aria-label="Share via Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"/>
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="flex space-x-6">
          <a href="/" class="text-gray-500 hover:text-blue-600 text-sm">Home</a>
          <a href="/tools" class="text-gray-500 hover:text-blue-600 text-sm">Tools</a>
          <a href="/blog" class="text-gray-500 hover:text-blue-600 text-sm">Blog</a>
          <a href="/about" class="text-gray-500 hover:text-blue-600 text-sm">About</a>
          <a href="/contact" class="text-gray-500 hover:text-blue-600 text-sm">Contact</a>
          <a href="/privacy" class="text-gray-500 hover:text-blue-600 text-sm">Privacy</a>
        </div>
      </div>
    </div>
  </footer>
</div>
