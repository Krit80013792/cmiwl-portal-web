/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'productfact-storage-nonprod.areegator.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.omise.co',
        pathname: '/**',
      },
    ],
  },
  env: {
    APP_ENV: process.env.APP_ENV,
    BASE_URL: process.env.BASE_URL,
    CMIWL_PROCESS_API_AUTHORIZE_URL: process.env.CMIWL_PROCESS_API_AUTHORIZE_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    PORTAL_API_KEY: process.env.PORTAL_API_KEY,
    PORTAL_RSA_PUB_KEY: process.env.PORTAL_RSA_PUB_KEY,
    PORTAL_RSA_PRI_KEY: process.env.PORTAL_RSA_PRI_KEY,
    REDIS_ENDPOINT: process.env.REDIS_ENDPOINT,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_CHANNELPREFIX: process.env.REDIS_CHANNELPREFIX,
    REDIS_DEFAULTDATABASE: process.env.REDIS_DEFAULTDATABASE,
    REDIS_TIMEOUTMINUTES: process.env.REDIS_TIMEOUTMINUTES,
    ELASTIC_APM_SERVER_URL: process.env.ELASTIC_APM_SERVER_URL,
    ELASTIC_APM_SERVICE_NAME: process.env.ELASTIC_APM_SERVICE_NAME,
    ELASTIC_APM_SECRET_TOKEN: process.env.ELASTIC_APM_SECRET_TOKEN,
    ELASTIC_APM_ENV: process.env.ELASTIC_APM_ENV,
    ELASTIC_APM_TX_SAMPLE_RATE: process.env.ELASTIC_APM_TX_SAMPLE_RATE,
    ELASTIC_APM_CENTRAL_CONFIG: process.env.ELASTIC_APM_CENTRAL_CONFIG,
    TIDLOR_TECH_URI: process.env.TIDLOR_TECH_URI,
  },

  // async headers() {
  //   return [
  //     {
  //       source: '/((?!api|health).*)',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'private, max-age=31536000, immutable',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/th/:path*',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'no-store',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/:all*\\.(css|js|woff2|ico|png|jpg|jpeg|gif|svg|webp)',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable',
  //         },
  //       ],
  //     },
  //   ]
  // },
}

module.exports = nextConfig
