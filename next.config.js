/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
};

module.exports = nextConfig;
