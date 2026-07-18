import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "FREENOUGH — Design Your Enough.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(
    join(process.cwd(), "public/images/compass_logo.png")
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={100} height={100} alt="" />
        <div
          style={{
            display: "flex",
            fontSize: 80,
            fontWeight: 700,
            color: "#111111",
            marginTop: 32,
          }}
        >
          FRE
          <span style={{ color: "#3F9C6D" }}>E</span>
          NOUGH
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            fontWeight: 500,
            color: "#555555",
            marginTop: 16,
          }}
        >
          Design Your Enough.
        </div>
      </div>
    ),
    { ...size }
  );
}
