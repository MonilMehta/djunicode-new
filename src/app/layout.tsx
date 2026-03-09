import "./globals.css";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getContactDetails } from "@/lib/content";

export const metadata = {
  metadataBase: new URL("https://www.djunicode.in"),
  title: {
    default: "DJ Unicode",
    template: "%s | DJ Unicode",
  },
  description:
    "Official site for Unicode, the student coding club of Dwarkadas J. Sanghvi College of Engineering.",
};

export default function RootLayout({ children }) {
  const contact = getContactDetails();

  return (
    <html lang="en">
      <body>
        <div className="page-frame">
          <Navbar />
          <main>{children}</main>
          <Footer contact={contact} />
        </div>
      </body>
    </html>
  );
}
