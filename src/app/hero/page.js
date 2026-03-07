import Image from "next/image";
import Link from "next/link";

import { ImmersiveRoute } from "@/components/immersive-route";
import { getSiteStats } from "@/lib/content";

const pillars = [
  {
    title: "Code",
    detail: "Real repositories, mentor review, and work that survives beyond the workshop.",
  },
  {
    title: "Create",
    detail: "Ideas become products, experiments, showcases, and a visible body of work.",
  },
  {
    title: "Collaborate",
    detail: "Each batch inherits context, contributes back, and raises the standard together.",
  },
];

export const metadata = {
  title: "Hero Preview",
  description: "Focused hero exploration for DJ Unicode.",
};

export default function HeroPreviewPage() {
  const stats = getSiteStats();

  return (
    <section className="hero-preview-page">
    </section>
  );
}
