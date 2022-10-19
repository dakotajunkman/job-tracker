module.exports = {
  async rewrites() {
    return {
      // Check Next.js /pages/api routes
      // If route doesn't exist, use BACKEND_URL
      fallback: [
        {
          source: '/api/:path*',
          destination: `${process.env.BACKEND_URL}/api/:path*`,
        },
      ],
    };
  },
};
