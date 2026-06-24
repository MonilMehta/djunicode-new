import { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us | DJ Unicode",
  description:
    "Learn about DJ Unicode, the official technical committee of Dwarkadas J. Sanghvi College of Engineering. Discover our history, mission, and how we foster technical excellence through hands-on learning.",
  openGraph: {
    title: "About Us | DJ Unicode",
    description: "Learn about DJ Unicode, the official technical committee of Dwarkadas J. Sanghvi College of Engineering.",
    url: "https://www.djunicode.in/about",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DJ Unicode - About Us",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About DJ Unicode",
            "description": "Learn about DJ Unicode, the official technical committee of Dwarkadas J. Sanghvi College of Engineering.",
            "url": "https://www.djunicode.in/about",
            "publisher": {
              "@type": "Organization",
              "name": "DJ Unicode"
            }
          })
        }}
      />
      <AboutClient />
    </>
  );
}