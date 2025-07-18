import StyledComponentsRegistry from '@/lib/registry';
import ThemeProvider from '@/contexts/ThemeContext';
import { CartProvider } from '@/contexts/CartContext';
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Header from '@/components/organisms/Header/Header';
import { cookies } from 'next/headers';
import { ThemeName } from '@/themes';
import "../globals.css";

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await Promise.resolve(params);

  if (!routing.locales.includes(locale as "en" | "tr")) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error('Failed to load locale messages:', error);
    notFound();
  }

  let initialTheme: ThemeName = 'light';
  try {
    // cookies() throws if called outside request scope (e.g., during unit tests)
    const cookieStore = await cookies();
    const val = cookieStore.get('theme')?.value as ThemeName | undefined;
    if (val === 'light' || val === 'dark') {
      initialTheme = val;
    }
  } catch {
    // ignore, keep default
  }

  return (
    <StyledComponentsRegistry>
      <ThemeProvider initialTheme={initialTheme}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CartProvider>
            <Header />
            <main style={{ minHeight: 'calc(100vh - 80px)' }}>
              {children}
            </main>
          </CartProvider>
        </NextIntlClientProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
