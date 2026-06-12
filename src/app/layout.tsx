


import { ThemeProvider } from '@/lib/theme-context';

export const metadata = {
  metadataBase: new URL("https://www.djunicode.in"),
  title: {
    default: "DJ Unicode",
    template: "%s | DJ Unicode",
  },
  description:
    "Official site for Unicode, the student coding club of Dwarkadas J. Sanghvi College of Engineering.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
