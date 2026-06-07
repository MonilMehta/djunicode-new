import fs from "node:fs";
import path from "node:path";
import MembersClient from "./MembersClient";

export default function MembersPage() {
  const membersDir = path.join(process.cwd(), "content", "data", "members");
  let members = [];
  
  if (fs.existsSync(membersDir)) {
    const files = fs.readdirSync(membersDir).filter(f => f.endsWith('.json'));
    members = files.map(file => {
      const raw = fs.readFileSync(path.join(membersDir, file), "utf8");
      return JSON.parse(raw);
    });
  }

  return <MembersClient membersData={members} />;
}
