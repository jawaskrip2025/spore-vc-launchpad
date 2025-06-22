/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PINATA_JWT: process.env.PINATA_JWT,
    PINATA_GATEWAY_URL: process.env.PINATA_GATEWAY_URL,
    W3AUTH_CLIENT_ID: process.env.W3AUTH_CLIENT_ID,
  }
};

export default nextConfig;
