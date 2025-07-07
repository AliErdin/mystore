import type { Metadata } from "next";
import I18nProvider from './I18nProvider';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/organisms/Header';
import StyledComponentsRegistry from '@/lib/registry';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Store - Quality Products at Great Prices",
  description: "Discover amazing products from our fake store. Browse electronics, jewelry, clothing and more with great deals and fast shipping.",
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params?: { locale?: string }
}>) {
  const locale = params?.locale || 'en';
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <I18nProvider>
          <StyledComponentsRegistry>
            <CartProvider>
              <Header />
              <main style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: 'white' }}>
                {children}
              </main>
            </CartProvider>
          </StyledComponentsRegistry>
        </I18nProvider>
      </body>
    </html>
  );
}
