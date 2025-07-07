import { Product } from '@/types';

const BASE_URL = 'https://fakestoreapi.com';

export async function getProducts(limit?: number, offset?: number): Promise<Product[]> {
  try {
    let url = `${BASE_URL}/products`;
    
    if (limit !== undefined || offset !== undefined) {
      const params = new URLSearchParams();
      if (limit) params.append('limit', limit.toString());
      if (offset) params.append('offset', offset.toString());
      url += `?${params.toString()}`;
    }
    console.log("url", url);

    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

export async function getProduct(id: number): Promise<Product> {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${category}`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
}
