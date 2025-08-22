/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    webpack: (config) => {
        config.optimization.minimize = true;
        config.resolve.fallback = { fs: false };
        return config;
    },

    async headers() {
        return [
            {
                source: '/((?!api|health).*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'private, max-age=31536000, immutable',
                    },
                ],
            },
            // {
            //     source: '/th/:path*',
            //     headers: [
            //         {
            //             key: 'Cache-Control',
            //             value: 'private, max-age=3600, must-revalidate',
            //         },
            //     ],
            // },
            {
                source: '/:all*\\.(css|js|woff2|ico|png|jpg|jpeg|gif|svg|webp)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    }
};

module.exports = nextConfig;
