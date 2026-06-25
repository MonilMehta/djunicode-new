


import "./globals.css";
import { ThemeProvider } from '@/lib/theme-context';
import { GlimmProvider, InterceptLinks } from 'glimm/next';

export const metadata = {
  metadataBase: new URL("https://www.djunicode.in"),
  title: {
    default: "DJ Unicode | Technical Committee of DJSCE",
    template: "%s | DJ Unicode",
  },
  description:
    "DJ Unicode is the official technical committee of Dwarkadas J. Sanghvi College of Engineering. A community of developers, designers, and innovators building impactful solutions.",
  openGraph: {
    title: "DJ Unicode | Technical Committee of DJSCE",
    description: "DJ Unicode is the official technical committee of Dwarkadas J. Sanghvi College of Engineering. A community of developers, designers, and innovators building impactful solutions.",
    url: "https://www.djunicode.in",
    siteName: "DJ Unicode",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ Unicode | Technical Committee of DJSCE",
    description: "DJ Unicode is the official technical committee of Dwarkadas J. Sanghvi College of Engineering. A community of developers, designers, and innovators building impactful solutions.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <GlimmProvider palette="lagoon">
            <InterceptLinks />
            {children}
          </GlimmProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
