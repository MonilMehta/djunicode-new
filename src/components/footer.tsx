import Link from "next/link";

export function Footer({ contact }: { contact: any }) {
  return (
    <div style={{ background: "#050505", paddingTop: "8rem" }}>
      <footer style={{ background: "#111", color: "#fff", overflow: "hidden", borderRadius: "32px 32px 0 0" }}>

        {/* ── Top: Tagline & Link Columns ──────────────────────────────── */}
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "4rem 4rem 0rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "2rem", flexWrap: "wrap" }}>

          <p style={{ color: "#c8c8c8", fontSize: "1.8rem", lineHeight: 1.4, maxWidth: 460, margin: 0, fontWeight: 500 }}>
            Build useful things with people<br />
            who care about craft.
          </p>

          {/* Link Columns */}
          <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <span style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.25rem" }}>Useful</span>
              <FooterLink href="/projects">Projects</FooterLink>
              <FooterLink href="/events">Events</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <span style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.25rem" }}>Updates</span>
              {contact.socialLinks?.map((item: any) => (
                <FooterLink key={item.label} href={item.href} external>{item.label}</FooterLink>
              ))}
            </div>

          </div>
        </div>

        {/* ── Bottom: Massive UNICODE Wordmark ─────────────────────────── */}
        <div style={{ width: "100%", padding: "0", overflow: "hidden", position: "relative", userSelect: "none", height: "clamp(4rem, 15vw, 18rem)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", width: "100%", transform: "translateY(35%)" }}>
            <span
              style={{
                color: "#333", // Darker grayish/charcoal
                fontWeight: 900,
                lineHeight: 0.8,
                letterSpacing: "-0.04em",
                display: "block",
                fontSize: "clamp(4rem, 15vw, 18rem)",
                fontFamily: "'Satoshi','Inter',sans-serif",
              }}
            >
              UNICODE
            </span>
          </div>
        </div>

      </footer>
    </div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const style: React.CSSProperties = { color: "#999", fontSize: "1.4rem", textDecoration: "none", position: "relative", width: "fit-content" };

  const inner = (
    <span style={{ position: "relative", display: "inline-block" }}>
      {children}
      {/* Underline grows left to right on hover via CSS class */}
      <span className="footer-link-underline" />
    </span>
  );

  if (external) return <a href={href} target="_blank" rel="noreferrer" style={style} className="footer-link">{inner}</a>;
  return <Link href={href} style={style} className="footer-link">{inner}</Link>;
}
