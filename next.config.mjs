/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Enable static optimization
  reactStrictMode: true,
  // Disable server-side image optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig; 