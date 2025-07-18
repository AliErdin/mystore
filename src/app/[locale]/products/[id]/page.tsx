import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/api';
import ProductDetailPage from '@/components/templates/ProductDetailPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ id: string, locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale });
  
  try {
    const product = await getProduct(parseInt(resolvedParams.id));
    
    return {
      title: t('product_page_title', { title: product.title }),
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [
          {
            url: product.image,
            width: 800,
            height: 600,
            alt: product.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: t('product_not_found_title'),
      description: t('product_not_found_desc'),
    };
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  try {
    const product = await getProduct(parseInt(resolvedParams.id));
    
    if (!product) {
      notFound();
    }

    return <ProductDetailPage product={product} />;
  } catch {
    notFound();
  }
}
