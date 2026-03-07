import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-block page-top">
      <div className="shell empty-state">
        <p className="section-eyebrow">404</p>
        <h1>That page is not in the archive.</h1>
        <p>Use the main library pages to get back into the site.</p>
        <div className="hero-actions">
          <Link href="/projects" className="primary-button">
            Projects
          </Link>
          <Link href="/events" className="secondary-button">
            Events
          </Link>
        </div>
      </div>
    </section>
  );
}
