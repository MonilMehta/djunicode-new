import { Metadata } from "next";
import { getContactDetails } from "@/lib/content";
import { ContactClient } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us | DJ Unicode",
  description: "Get in touch with DJ Unicode, the official technical committee of Dwarkadas J. Sanghvi College of Engineering. Reach out for collaborations, sponsorships, or general inquiries.",
  openGraph: {
    title: "Contact Us | DJ Unicode",
    description: "Get in touch with DJ Unicode, the official technical committee of Dwarkadas J. Sanghvi College of Engineering.",
    url: "https://www.djunicode.in/contact",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DJ Unicode - Contact Us",
      },
    ],
  },
};

export default function ContactPage() {
  const contact = getContactDetails();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact DJ Unicode",
    "description": "Get in touch with DJ Unicode, the official technical committee of Dwarkadas J. Sanghvi College of Engineering.",
    "url": "https://www.djunicode.in/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "DJ Unicode",
      "email": contact.email,
      "telephone": contact.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dwarkadas J. Sanghvi College of Engineering",
        "addressLocality": "Vile Parle, Mumbai",
        "postalCode": "400056",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient contact={contact} />
    </>
  );
}
