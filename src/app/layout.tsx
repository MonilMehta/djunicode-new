


import { ThemeProvider } from '@/lib/theme-context';
import { GlimmProvider, InterceptLinks } from 'glimm/next';

export const metadata = {
  metadataBase: new URL("https://www.djunicode.in"),
  title: {
    default: "DJ Unicode",
    template: "%s | DJ Unicode",
  },
  description:
    "Official site for Unicode, the student coding club of Dwarkadas J. Sanghvi College of Engineering.",
  openGraph: {
    title: "DJ Unicode",
    description: "Official site for Unicode, the student coding club of Dwarkadas J. Sanghvi College of Engineering.",
    url: "https://www.djunicode.in",
    siteName: "DJ Unicode",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ Unicode",
    description: "Official site for Unicode, the student coding club of Dwarkadas J. Sanghvi College of Engineering.",
  },
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
