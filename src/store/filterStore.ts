import { create } from 'zustand';
import type { FilterState } from '@shared/types';
const initialMaxPrice = 100; // A sensible default
// We extend the FilterState from shared/types.ts for internal store usage
// without modifying the shared type, which is also used by components.
interface InternalFilterState extends FilterState {
  maxPrice: number;
  updateMaxPrice: (newMaxPrice: number) => void;
}
export const useFilterStore = create<InternalFilterState>((set, get) => ({
  categories: [],
  priceRange: [0, initialMaxPrice],
  brands: [],
  colors: [],
  maxPrice: initialMaxPrice,
  setCategories: (categories) => set({ categories }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setBrands: (brands) => set({ brands }),
  setColors: (colors) => set({ colors }),
  updateMaxPrice: (newMaxPrice) => {
    const currentRange = get().priceRange;
    // When max price is updated, we ensure the upper bound of the range is also updated.
    set({ 
      maxPrice: newMaxPrice,
      priceRange: [currentRange[0], newMaxPrice] 
    });
  },
  reset: () => {
    // The reset function now correctly uses the dynamically updated maxPrice.
    const maxPrice = get().maxPrice;
    set({
      categories: [],
      priceRange: [0, maxPrice],
      brands: [],
      colors: [],
    });
  },
}));