import Link from "next/link";

const navigation = [
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-shell">
        <Link href="/" className="brand-mark">
          <span className="brand-badge">DJ</span>
          <span className="brand-copy">
            <strong>Unicode</strong>
            <span>Code. Create. Collaborate.</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
