import React from 'react';
import { Metadata } from 'next';
import CartPage from '@/components/templates/CartPage';

export const metadata: Metadata = {
  title: 'Shopping Cart - My Store',
  description: 'Review and manage items in your shopping cart',
};

export default function Cart() {
  return <CartPage />;
}
