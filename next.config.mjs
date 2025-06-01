/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PINATA_JWT: process.env.PINATA_JWT,
    PINATA_GATEWAY_URL: process.env.PINATA_GATEWAY_URL,
  }
};

export default nextConfig;
