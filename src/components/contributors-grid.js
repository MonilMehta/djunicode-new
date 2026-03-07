function ContributorCard({ person }) {
  return (
    <article className="contributor-card">
      <div className="contributor-avatar">
        {person.profilePic ? (
          <img src={person.profilePic} alt={person.name} />
        ) : (
          <div className="image-fallback" />
        )}
      </div>
      <div className="contributor-body">
        <h4>{person.name}</h4>
        {person.desc ? <p>{person.desc}</p> : null}
        <div className="contributor-links">
          {person.github ? (
            <a href={person.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          ) : null}
          {person.linkedIn ? (
            <a href={person.linkedIn} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          ) : null}
          {person.email ? <a href={`mailto:${person.email}`}>Email</a> : null}
        </div>
      </div>
    </article>
  );
}

function ContributorFallback({ people, missingKeys, totalKeys }) {
  if (people.length && !missingKeys.length) {
    return null;
  }

  if (missingKeys.length) {
    return (
      <p className="detail-note">
        {people.length
          ? `Some contributor profiles are missing from the archive (${missingKeys.join(", ")}).`
          : `This group references ${totalKeys} contributor profile${
              totalKeys === 1 ? "" : "s"
            }, but the matching archive record is missing.`}
      </p>
    );
  }

  return (
    <p className="detail-note">
      No archived profiles are listed for this contributor group.
    </p>
  );
}

export function ContributorsGrid({ title, group }) {
  const people = group?.people ?? [];
  const missingKeys = group?.missingKeys ?? [];
  const totalKeys = group?.totalKeys ?? 0;

  return (
    <section className="detail-section">
      <div className="detail-section-head">
        <p className="section-eyebrow">Contributors</p>
        <h3>{title}</h3>
      </div>
      {people.length ? (
        <div className="contributors-grid">
          {people.map((person) => (
            <ContributorCard
              key={`${title}-${person.key ?? person.name}`}
              person={person}
            />
          ))}
        </div>
      ) : null}
      <ContributorFallback
        people={people}
        missingKeys={missingKeys}
        totalKeys={totalKeys}
      />
    </section>
  );
}
