import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "atvmwhvffrkirifledfx.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/avatars/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
