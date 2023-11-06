/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "source.unsplash.com",
      "i.imgur.com",
      "links.papareact.com",
      "cdn.sanity.io",
      "images.pexels.com",
    ],
  },
};
