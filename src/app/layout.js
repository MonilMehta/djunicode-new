import "./globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

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
  return (
    <html lang="en">
      <body>
        <div className="page-frame">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
