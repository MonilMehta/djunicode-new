import type { Metadata } from "next";
import MembersClient from "./MembersClient";
import fs from "node:fs";
import path from "node:path";

export const metadata: Metadata = {
  title: "Members | DJ Unicode",
  description: "A collective of students who love to break things, build fun projects, and ship together. Meet the developers, designers, and innovators of DJ Unicode.",
  openGraph: {
    title: "Members Directory | DJ Unicode",
    description: "Meet the developers, designers, and innovators of DJ Unicode.",
    url: "https://www.djunicode.in/members",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DJ Unicode - Members",
      },
    ],
  },
};

function toAssetPath(value: string | null | undefined) {
  if (!value || typeof value !== "string") return null;
  return value.replace(/\\/g, "/").replace(/^(\.\.\/)+images\//, "/images/");
}

export default function MembersPage() {
  const membersDir = path.join(process.cwd(), "content", "data", "members");
  let members: any[] = [];

  if (fs.existsSync(membersDir)) {
    const files = fs.readdirSync(membersDir).filter((f) => f.endsWith(".json"));
    members = files.map((file) => {
      const raw = fs.readFileSync(path.join(membersDir, file), "utf8");
      const data = JSON.parse(raw);
      return {
        ...data,
        profile_pic: toAssetPath(data.profile_pic) ?? "",
      };
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "DJ Unicode Members",
            "description": "Meet the developers, designers, and innovators of DJ Unicode.",
            "url": "https://www.djunicode.in/members"
          })
        }}
      />
      <MembersClient membersData={members} />
    </>
  );
}
