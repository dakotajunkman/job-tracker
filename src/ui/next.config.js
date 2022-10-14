module.exports = {
  async rewrites() {
    return [
      {
        // re-route all non authentication paths to backend URL
        // calls to `/api/auth/...` will route through Next.js
        source: '/api/:path(^(?!auth/).*$)',
        destination: `${process.env.BACKEND_URL}/api/:path*`,
      },
    ];
  },
};
