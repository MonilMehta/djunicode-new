import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/keystatic/", "/api/", "/vault/"],
    },
    sitemap: "https://www.djunicode.in/sitemap.xml",
  };
}