import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getProducts, getCategories } from '@/lib/api';
import ProductsPage from '@/components/templates/ProductsPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: `${t('products')} - ${t('my_store')}`,
    description: t('products_subtitle'),
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    sortBy?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}) {
  const params = (await searchParams) || {};
  const page = parseInt(params.page || '1');
  const limit = 10;


  try {
    const [allProducts, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
    
    let filteredProducts = [...allProducts];

    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
      );
    }

    if (params.category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === params.category
      );
    }

    if (params.minPrice) {
      const minPrice = parseFloat(params.minPrice);
      filteredProducts = filteredProducts.filter(product =>
        product.price >= minPrice
      );
    }

    if (params.maxPrice) {
      const maxPrice = parseFloat(params.maxPrice);
      filteredProducts = filteredProducts.filter(product =>
        product.price <= maxPrice
      );
    }

    if (params.sortBy) {
      switch (params.sortBy) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        case 'title':
          filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }
    }

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / limit);
    const paginatedProducts = filteredProducts.slice(
      (page - 1) * limit,
      page * limit
    );

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsPage
          products={paginatedProducts}
          categories={categories}
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalProducts}
          itemsPerPage={limit}
        />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading products:', error);
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Error loading products</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
}
