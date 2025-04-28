/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        bodySizeLimit: "2md",
      },
};

export default nextConfig;
