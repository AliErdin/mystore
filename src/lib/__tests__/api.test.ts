import { getProducts, getProduct, getCategories, getProductsByCategory } from '../api';

global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('API Functions', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('getProducts', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });
    
    it('fetches products with undefined limit and offset', async () => {
      const mockProducts = [{ id: 1, title: 'Product 1', price: 10 }];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      } as Response);

      await getProducts(undefined, undefined);
      
      expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/products', {
        next: { revalidate: 3600 }
      });
    });

    it('fetches products successfully', async () => {
      const mockProducts = [
        { id: 1, title: 'Product 1', price: 10 },
        { id: 2, title: 'Product 2', price: 20 }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      } as Response);

      const result = await getProducts();
      
      expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/products', {
        next: { revalidate: 3600 }
      });
      expect(result).toEqual(mockProducts);
    });

    it('handles fetch errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getProducts()).rejects.toThrow('Failed to fetch products');
    });

    it('fetches products with limit and offset', async () => {
      const mockProducts = [{ id: 1, title: 'Product 1', price: 10 }];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      } as Response);

      await getProducts(5, 10);
      
      expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5&offset=10', {
        next: { revalidate: 3600 }
      });
    });
    
    it('fetches products with only limit parameter', async () => {
      const mockProducts = [{ id: 1, title: 'Product 1', price: 10 }];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      } as Response);

      await getProducts(5);
      
      expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5', {
        next: { revalidate: 3600 }
      });
    });
    
    it('fetches products with only offset parameter', async () => {
      const mockProducts = [{ id: 1, title: 'Product 1', price: 10 }];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      } as Response);

      await getProducts(undefined, 10);
      
      expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/products?offset=10', {
        next: { revalidate: 3600 }
      });
    });
    
    it('handles HTTP error response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      await expect(getProducts()).rejects.toThrow('Failed to fetch products');
    });
  });

  describe('getProduct', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('fetches single product successfully', async () => {
      const mockProduct = { id: 1, title: 'Product 1', price: 10 };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      } as Response);

      const result = await getProduct(1);
      
      expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/1', {
        next: { revalidate: 3600 }
      });
      expect(result).toEqual(mockProduct);
    });

    it('handles product not found', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(getProduct(999)).rejects.toThrow('Failed to fetch product');
    });
  });

  describe('getCategories', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });
    
    it('throws the original error when response is not ok', async () => {
      const originalError = new Error('HTTP error! status: 500');
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => { throw originalError; }
      } as unknown as Response);

      await expect(getCategories()).rejects.toThrow('HTTP error! status: 500');
      expect(console.error).toHaveBeenCalledWith('Error fetching categories:', expect.any(Error));
    });
    
    it('fetches categories successfully', async () => {
      const mockCategories = ['electronics', 'clothing'];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      } as Response);

      const result = await getCategories();
      
      expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/categories', {
        next: { revalidate: 3600 }
      });
      expect(result).toEqual(mockCategories);
    });
    
    it('handles HTTP errors when fetching categories', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      await expect(getCategories()).rejects.toThrow('HTTP error! status: 500');
    });
    
    it('handles network errors when fetching categories', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getCategories()).rejects.toThrow();
    });
    
    it('handles different types of errors when fetching categories', async () => {
      const customError = new TypeError('Custom type error');
      mockFetch.mockRejectedValueOnce(customError);

      await expect(getCategories()).rejects.toThrow();
      expect(console.error).toHaveBeenCalledWith('Error fetching categories:', customError);
    });
  });

  describe('getProductsByCategory', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });
    
    it('fetches products by category successfully', async () => {
      const mockProducts = [{ id: 1, title: 'Electronics Product', category: 'electronics' }];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      } as Response);

      const result = await getProductsByCategory('electronics');
      
      expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/category/electronics', {
        next: { revalidate: 3600 }
      });
      expect(result).toEqual(mockProducts);
    });
    
    it('handles HTTP errors when fetching products by category', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(getProductsByCategory('nonexistent')).rejects.toThrow('HTTP error! status: 404');
    });
    
    it('handles network errors when fetching products by category', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getProductsByCategory('electronics')).rejects.toThrow();
    });
  });
});
