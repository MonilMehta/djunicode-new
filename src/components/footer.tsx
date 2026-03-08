import Link from "next/link";

import { getContactDetails } from "@/lib/content";

export function Footer() {
  const contact = getContactDetails();

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-kicker">DJ Unicode</p>
          <h2>Build useful things with people who care about craft.</h2>
        </div>
        <div className="footer-links">
          <Link href="/projects">Projects</Link>
          <Link href="/events">Events</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-links">
          {contact.socialLinks.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
