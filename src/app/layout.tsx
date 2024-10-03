import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Welcome to my blog!',
  icons: {
    icon: '/png/beulping.png',
  },
  openGraph: {
    title: 'Blog',
    images: [
      {
        url: '/png/beulping.png',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>{children}</body>
    </html>
  );
}
