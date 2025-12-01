/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Required for Next.js and dynamic imports
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Allow Google Fonts and inline styles
              "img-src 'self' data: https: blob:", // Allow images from any HTTPS source, data URIs, and blobs
              "font-src 'self' data: https://fonts.gstatic.com", // Allow Google Fonts
              "connect-src 'self' https://app.tidlor.com https://productfact-storage-nonprod.areegator.com https://api.omise.co",
              "frame-ancestors 'none'",
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
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
    ]
  },
}

module.exports = nextConfig
