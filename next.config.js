/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'framerusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.iticket.com.tr',
            },
        ],
    },
};

module.exports = withNextIntl(nextConfig);
