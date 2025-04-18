/**
 * Site configuration settings
 * Update these values when changing domains or site information
 */

// Set your production domain here (without protocol)
export const domain = 'yttoolbox.com';

// Full URL with protocol
export const siteUrl = `https://${domain}`;

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
  return `${siteUrl}${path}`;
}
