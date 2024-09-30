/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*', // Apply to all routes
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, s-maxage=86400, max-age=0, must-revalidate', // Customize the value as needed
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;