import { getContactDetails } from "@/lib/content";
import { ContactClient } from "./contact-client";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const contact = getContactDetails();

  return <ContactClient contact={contact} />;
}
