<script lang="ts">
  import { onMount } from 'svelte';
  
  export let title = 'YtToolBox - Free YouTube Tools';
  export let description = 'Enhance your YouTube experience with our suite of powerful tools for content creators and viewers.';
  export let url = 'https://yttoolbox.com';
  export let type = 'WebApplication';
  
  onMount(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': type,
      'name': title,
      'description': description,
      'url': url,
      'applicationCategory': 'MultimediaApplication',
      'operatingSystem': 'Any',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  });
</script> 