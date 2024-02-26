import { defineConfig } from 'convert-markdown-to-html';

const ogDescription = 'Swagger Typescript Generate API Docs';
const ogImage = 'https://hung.thedev.id/og-image.png';
const ogTitle = 'Swagger Typescript Generate API Docs';
const ogUrl = 'https://hung.thedev.id/images/patak-banner.jpg';

export default defineConfig({
  input: 'index.md',
  output: 'index.html',
  isTwoSlash: true,

  title: 'Swagger Typescript Generate API Docs',
  description: 'Swagger Typescript Generate API Docs',

  logo: '',

  socialLinks: [
    {
      icon: 'twitter',
      url: 'https://twitter.com/hunghg255',
    },
    {
      icon: 'github',
      url: 'https://github.com/hunghg255/swagger-typescript-api-es',
    },
  ],
  footer: {
    message: 'Released under the MIT License',
    copyright: 'Copyright © 2023-present Hunghg255',
  },

  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@hunghg255' }],
    ['meta', { name: 'theme-color', content: '#7eaf90' }],
  ],
});
