import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // 実際の更新日が分からないため、ビルド時刻由来のlastModifiedは付けない
  // (docs/fixes/active/claude_instruction_image_sitemap_fix.md セクションC参照)
  return [
    {
      url: "https://www.freenough.com/",
    },
  ];
}
