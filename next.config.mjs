/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        if (process.env.NODE_ENV === 'development') {
            return [
                {
                    source: '/api/:path*',
                    destination: 'https://system-notes.vercel.app/api/:path*',
                },
            ];
        }
        return [];
    },
    env: {
        BASE_URL: 'https://system-notes.vercel.app/api',
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
                ],
            },
        ];
    },
};

export default nextConfig;
