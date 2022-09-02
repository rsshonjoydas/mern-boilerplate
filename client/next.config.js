const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '/',
    domains: [
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      'graph.facebook.com',
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
