import MembersClient from "./MembersClient";
import fs from "node:fs";
import path from "node:path";

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

  return <MembersClient membersData={members} />;
}
