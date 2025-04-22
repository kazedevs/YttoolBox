<script lang="ts">
  import { onMount } from 'svelte';
  
  onMount(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    
    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);
    
    // Initialize Google Analytics
    // @ts-ignore - Google Analytics types
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore - Google Analytics types
    function gtag(...args: any[]) {
      // @ts-ignore - Google Analytics types
      window.dataLayer.push(arguments);
    }
    // @ts-ignore - Google Analytics types
    gtag('js', new Date());
    // @ts-ignore - Google Analytics types
    gtag('config', measurementId);
  });
</script> 