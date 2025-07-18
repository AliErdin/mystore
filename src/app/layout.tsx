import { cookies } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist-sans',
});
const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist-mono',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localeCookie = (await cookies()).get('NEXT_LOCALE');
  const locale = localeCookie?.value ?? 'en';

  const fontClasses = `${geistSans.variable} ${geistMono.variable}`;

  return (
    <html lang={locale}>
      <body className={fontClasses}>
        {children}
      </body>
    </html>
  );
}
