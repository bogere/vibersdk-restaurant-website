import { motion } from 'framer-motion';
import { useFilterStore } from '@/store/filterStore';
import { MenuItemCard } from './MenuItemCard';
import { useMemo } from 'react';
import { useMenuData } from '@/hooks/useMenuData';
import { MenuItemCardSkeleton } from './MenuItemCardSkeleton';
export function MenuGrid() {
  const { data, isLoading, error } = useMenuData();
  const categories = useFilterStore((state) => state.categories);
  const priceRange = useFilterStore((state) => state.priceRange);
  const filteredProducts = useMemo(() => {
    if (!data) return [];
    return data.products.filter((product) => {
      const categoryMatch = categories.length === 0 || categories.includes(product.category);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });
  }, [data, categories, priceRange]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <MenuItemCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className="col-span-full flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-red-500/30 bg-red-500/10 text-red-400">
        <p className="text-xl font-semibold">Failed to load menu</p>
        <p className="mt-2 text-red-400/80">{error.message}</p>
      </div>
    );
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
    >
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <MenuItemCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-700 bg-slate-900/50">
          <p className="text-xl font-semibold text-slate-400">No dishes found</p>
          <p className="mt-2 text-slate-500">Try adjusting your filters.</p>
        </div>
      )}
    </motion.div>
  );
}