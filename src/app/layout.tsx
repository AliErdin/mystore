import type { Metadata } from "next";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StyledComponentsRegistry>
          <CartProvider>
            <Header />
            <main style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: 'white' }}>
              {children}
            </main>
          </CartProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
