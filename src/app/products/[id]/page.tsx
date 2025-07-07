import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/api';
import ProductDetailPage from '@/components/templates/ProductDetailPage';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const product = await getProduct(parseInt(resolvedParams.id));
    
    return {
      title: `${product.title} - My Store`,
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
      title: 'Product Not Found - My Store',
      description: 'The requested product could not be found.',
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
