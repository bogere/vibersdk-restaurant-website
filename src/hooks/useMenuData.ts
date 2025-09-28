import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';
import type { Product, Category } from '@shared/types';
interface MenuData {
  products: Product[];
  categories: Category[];
}
interface UseMenuDataReturn {
  data: MenuData | null;
  isLoading: boolean;
  error: Error | null;
}
export function useMenuData(): UseMenuDataReturn {
  const [data, setData] = useState<MenuData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const [products, categories] = await Promise.all([
          api<Product[]>('/api/menu'),
          api<Category[]>('/api/categories'),
        ]);
        setData({ products, categories });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch menu data'));
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return { data, isLoading, error };
}