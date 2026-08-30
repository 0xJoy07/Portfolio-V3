/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    // Static export (output: 'export') does not support Next.js server-side image
    // optimisation — unoptimized must stay. Lazy loading is handled via loading="lazy"
    // on individual <img> elements instead.
    unoptimized: true,
  },
};

export default nextConfig;