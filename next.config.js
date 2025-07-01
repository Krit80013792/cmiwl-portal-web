/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    webpack: (config) => {
        config.optimization.minimize = true;
        config.resolve.fallback = { fs: false };
        return config;
    },
};

module.exports = nextConfig;
