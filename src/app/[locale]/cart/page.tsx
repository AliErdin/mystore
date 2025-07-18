import React from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CartPage from '@/components/templates/CartPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: `${t('shopping_cart')} - ${t('my_store')}`,
    description: t('cart_empty_desc'),
  };
}

export default function Cart() {
  return <CartPage />;
}
