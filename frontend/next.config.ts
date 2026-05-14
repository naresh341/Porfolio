import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // GitHub OpenGraph preview cards
      {
        protocol: "https",
        hostname: "repository-images.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
      },
      // Raw GitHub user-content (README screenshots stored in Issues/Releases)
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
      },
      // raw.githubusercontent.com (relative README images)
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      // GitHub private asset CDN (uploaded via drag-drop in Issues)
      {
        protocol: "https",
        hostname: "github.com",
      },
      // Cloudinary (manually uploaded project images)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    
    ],
  },
};

export default nextConfig;
