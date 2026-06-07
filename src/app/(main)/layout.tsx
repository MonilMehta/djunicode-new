import "../globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getContactDetails } from "@/lib/content";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const contact = getContactDetails();

  return (
    <div className="page-frame">
      <Navbar />
      <main>{children}</main>
      <Footer contact={contact} />
    </div>
  );
}
