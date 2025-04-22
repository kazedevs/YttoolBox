<script>
  import { onMount } from 'svelte';
  
  let name = '';
  let email = '';
  let subject = '';
  let message = '';
  let formStatus = '';
  
  function handleSubmit() {
    // Clear previous status
    formStatus = '';
    
    // Basic validation
    if (!name || !email || !message) {
      formStatus = 'error';
      return;
    }
    
    // For a clientside-only solution, we'll open the user's mail client
    const mailtoLink = `mailto:contactyttoolbox@gmail.com?subject=${encodeURIComponent(subject || 'Contact form submission')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    
    window.location.href = mailtoLink;
    formStatus = 'success';
  }
</script>

<svelte:head>
  <title>Contact Us | YtToolBox</title>
  <meta name="description" content="Get in touch with the YtToolBox team. We'd love to hear your feedback, questions, or suggestions." />
  <meta property="og:title" content="Contact Us | YtToolBox" />
  <meta property="og:description" content="Get in touch with the YtToolBox team. We'd love to hear your feedback, questions, or suggestions." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yttoolbox.com/contact" />
  <link rel="canonical" href="https://yttoolbox.com/contact" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="max-w-2xl mx-auto">
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
      
      <p class="text-gray-600 mb-8">Have a question, suggestion, or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.</p>
      
      {#if formStatus === 'success'}
        <div class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
          Thank you for your message! Your email client should have opened with the message details. If it didn't, please email us directly at contactyttoolbox@gmail.com
        </div>
      {:else if formStatus === 'error'}
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          Please fill out all required fields.
        </div>
      {/if}
      
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input 
            type="text" 
            id="name" 
            bind:value={name} 
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input 
            type="email" 
            id="email" 
            bind:value={email} 
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        
        <div>
          <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input 
            type="text" 
            id="subject" 
            bind:value={subject}
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message *</label>
          <textarea 
            id="message" 
            bind:value={message} 
            required
            rows="5"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y"
          ></textarea>
        </div>
        
        <div class="pt-2">
          <button 
            type="submit" 
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Send Message
          </button>
        </div>
      </form>
      
      <div class="mt-8 pt-6 border-t border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Contact Information</h2>
        <p class="text-gray-600 mb-1">Email: <a href="mailto:contactyttoolbox@gmail.com" class="text-blue-600 hover:underline">contactyttoolbox@gmail.com</a></p>
      </div>
    </div>
  </div>
</div>
