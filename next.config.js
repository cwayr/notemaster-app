/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Optional: If you're using a CDN or custom domain and need to set a base path:
  // basePath: '/your-base-path',
  // Optional: If your static export has issues with trailing slashes in links:
  // trailingSlash: true, 
  // Optional: If you encounter issues with image optimization (though for pure static export, 
  // you might handle images differently or use a cloud provider's image optimization):
  // images: {
  //   unoptimized: true,
  // },
};

module.exports = nextConfig
