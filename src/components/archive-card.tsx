import Link from "next/link";

export function ArchiveCard({ href, title, description, image, meta, tags = [] }) {
  return (
    <Link href={href} className="archive-card">
      <div className="archive-card-media">
        {image ? <img src={image} alt={title} /> : <div className="image-fallback" />}
      </div>
      <div className="archive-card-body">
        {meta ? <p className="card-meta">{meta}</p> : null}
        <h3>{title}</h3>
        <p>{description}</p>
        {tags.length ? (
          <div className="tag-row">
            {tags.slice(0, 4).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
