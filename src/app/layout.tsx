import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { MouseProvider } from '@/components/MouseContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: '往往如此 - 二次元人像写真',
  description: '专业二次元Cosplay人像摄影，预约拍摄，查看作品',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <MouseProvider>
            {children}
          </MouseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}