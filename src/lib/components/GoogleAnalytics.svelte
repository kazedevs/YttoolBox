<script lang="ts">
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-5GPDFL5PPC';
    script.async = true;
    document.head.appendChild(script);
    
    // Initialize Google Analytics
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    function gtag(...args: any[]){window.dataLayer.push(arguments);}
    // @ts-ignore
    gtag('js', new Date());
    // @ts-ignore
    gtag('config', 'G-5GPDFL5PPC');
  });
</script> 