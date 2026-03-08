import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { getContactDetails } from "@/lib/content";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const contact = getContactDetails();

  return (
    <section className="section-block page-top">
      <div className="shell contact-grid">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Talk to DJ Unicode"
            description="The new site keeps the original contact paths while replacing the Gatsby form implementation with a Next-native request flow."
          />
          <div className="contact-card">
            <p className="card-meta">Email</p>
            <a href={contact.emailHref}>{contact.email}</a>
            <p className="card-meta">Phone</p>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <p className="card-meta">Campus</p>
            <p>{contact.address}</p>
            <div className="contact-socials">
              {contact.socialLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="contact-column">
          <div className="contact-card">
            <p className="card-meta">Send a message</p>
            <ContactForm />
          </div>
          <div className="map-card">
            <iframe
              title="DJ Unicode location"
              src={contact.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
