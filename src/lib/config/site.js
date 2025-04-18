/**
 * Site configuration settings
 * Update these values when changing domains or site information
 */

// GitHub Pages configuration
const isGitHubPages = true; // Set to true for GitHub Pages, false for custom domain
const githubUsername = 'kazedevs';
const repositoryName = 'YttoolBox';

// Base path for GitHub Pages or empty for custom domain
export const basePath = isGitHubPages ? `/${repositoryName}` : '';

// Domain configuration
let domain;
export let siteUrl;

if (isGitHubPages) {
  // GitHub Pages domain
  domain = `${githubUsername}.github.io`;
  siteUrl = `https://${domain}${basePath}`;
} else {
  // Custom domain setup
  domain = 'yttoolbox.com'; // Your custom domain
  siteUrl = `https://${domain}`;
}

// Site metadata
export const siteMeta = {
  title: 'YtToolBox',
  description: 'Free YouTube tools to help content creators grow their channels',
  author: 'YtToolBox Team',
  twitterHandle: '@yttoolbox',
  // Add more site-wide metadata as needed
};

// Social media links
export const socialLinks = {
  twitter: 'https://twitter.com/yttoolbox',
  facebook: 'https://facebook.com/yttoolbox',
  instagram: 'https://instagram.com/yttoolbox',
  github: 'https://github.com/yttoolbox',
  // Add more social links as needed
};

/**
 * Helper function to get fully qualified URLs for SEO and sharing
 * @param {string} path - The relative path (should start with /)
 * @returns {string} - Full URL including domain
 */
export function getPageUrl(path) {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  
  // For GitHub Pages, we need to ensure the base path is included
  // but we don't want to add it twice if the path already includes it
  if (basePath && !path.startsWith(basePath)) {
    // If using GitHub Pages and path doesn't already include the base path
    return `${siteUrl}${path}`;
  } else {
    // For custom domain or if path already includes base path
    return `${siteUrl}${path}`;
  }
}
