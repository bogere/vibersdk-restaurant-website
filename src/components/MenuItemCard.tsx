import { motion } from 'framer-motion';
import type { Product } from '@shared/types';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { Plus } from 'lucide-react';
interface MenuItemCardProps {
  product: Product;
}
export function MenuItemCard({ product }: MenuItemCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-eatery-gold/10"
    >
      <div className="aspect-h-9 aspect-w-16 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold text-eatery-light">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-slate-400">{product.description}</p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-lg font-bold text-eatery-gold">
            ${product.price.toFixed(2)}
          </p>
          <Button
            onClick={() => addItem(product)}
            className="bg-eatery-gold text-eatery-dark font-bold opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-eatery-gold/90"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}