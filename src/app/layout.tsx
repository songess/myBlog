import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import BlogHeader from '@/components/all/BlogHeader';
import localFont from 'next/font/local';

export const dynamic = 'force-static';

const pretendard = localFont({
  src: '../styles/fonts/Pretendard-Bold.otf',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: 'songess blog',
  description: '기록하며 정리하는 나의 이야기',
  icons: {
    icon: '/png/thumbnail.png',
  },
  openGraph: {
    title: 'Blog',
    images: [
      {
        url: '/png/thumbnail.png',
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
    <html lang="kr" suppressHydrationWarning>
      <body className={`${pretendard.className} pt-[70px]`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BlogHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
