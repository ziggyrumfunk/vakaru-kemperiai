import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack/Tailwind don't pick a stray parent lockfile.
  turbopack: { root: process.cwd() },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "www.vakarukemperiai.lt" }],
  },
};

export default withNextIntl(nextConfig);
