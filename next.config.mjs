/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["@react-native-async-storage/async-storage"] = false;
    }
    return config;
  },
  env: {
    PINATA_JWT: process.env.PINATA_JWT,
    PINATA_GATEWAY_URL: process.env.PINATA_GATEWAY_URL,
    W3AUTH_CLIENT_ID: process.env.W3AUTH_CLIENT_ID,
    BASE_URL: process.env.BASE_URL,
    ZKME_APP_ID: process.env.ZKME_APP_ID,
    ZKME_DAPP_NAME: process.env.ZKME_DAPP_NAME,
    ZKME_PROGRAM_NO: process.env.ZKME_PROGRAM_NO,
    ZKME_API_KEY: process.env.ZKME_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maroon-delicate-coyote-528.mypinata.cloud",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "red-careful-koala-550.mypinata.cloud",
        port: "",
        pathname: "/**",
      },
      {
        hostname: "copper-random-mammal-506.mypinata.cloud",
        protocol: "https",
      },
      {
        protocol: "https",
        hostname: "api-dev.e-wow.my.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.terravest.capital",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
