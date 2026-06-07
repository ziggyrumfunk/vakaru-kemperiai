import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/lt/admin", "/ru/admin", "/lv/admin", "/en/admin"] },
    sitemap: "https://www.vakarukemperiai.lt/sitemap.xml",
  };
}
