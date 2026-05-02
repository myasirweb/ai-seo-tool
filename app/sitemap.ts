import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/dashboard`,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/dashboard/keyword-research`,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dashboard/meta-generator`,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dashboard/content-score`,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dashboard/readability`,
      priority: 0.8,
    },
  ];
}
