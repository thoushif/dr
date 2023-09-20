/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["i.imgur.com", "links.papareact.com", "cdn.sanity.io"],
  },
};
