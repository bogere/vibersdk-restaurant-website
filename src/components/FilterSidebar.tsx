import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilterStore } from "@/store/filterStore";
import { useMenuData } from "@/hooks/useMenuData";
import { Button } from "./ui/button";
import { useEffect } from "react";
export function FilterSidebar() {
  const { data, isLoading } = useMenuData();
  const categories = useFilterStore((state) => state.categories);
  const setCategories = useFilterStore((state) => state.setCategories);
  const priceRange = useFilterStore((state) => state.priceRange);
  const setPriceRange = useFilterStore((state) => state.setPriceRange);
  const reset = useFilterStore((state) => state.reset);
  const updateMaxPrice = useFilterStore((state) => state.updateMaxPrice);
  const storeMaxPrice = useFilterStore((state) => state.maxPrice);
  const maxPrice = data ? Math.ceil(Math.max(...data.products.map(p => p.price), 100)) : storeMaxPrice;
  useEffect(() => {
    if (data) {
      const newMaxPrice = Math.ceil(Math.max(...data.products.map(p => p.price), 100));
      if (newMaxPrice !== storeMaxPrice) {
        updateMaxPrice(newMaxPrice);
      }
    }
  }, [data, storeMaxPrice, updateMaxPrice]);
  const handleCategoryChange = (checked: boolean, categorySlug: string) => {
    const newCategories = checked
      ? [...categories, categorySlug]
      : categories.filter((c) => c !== categorySlug);
    setCategories(newCategories);
  };
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl font-bold text-eatery-light">Filters</h3>
        <Button variant="ghost" onClick={reset} className="text-sm text-slate-400 hover:text-eatery-gold">Reset</Button>
      </div>
      <Accordion type="multiple" defaultValue={['category', 'price']} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="text-lg font-semibold text-eatery-light hover:no-underline">Category</AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-3">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-32 rounded" />
                  </div>
                ))
              ) : (
                data?.categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={category.slug}
                      checked={categories.includes(category.slug)}
                      onCheckedChange={(checked) => handleCategoryChange(!!checked, category.slug)}
                      className="border-slate-600 data-[state=checked]:bg-eatery-gold data-[state=checked]:text-eatery-dark"
                    />
                    <Label htmlFor={category.slug} className="text-slate-300">{category.name}</Label>
                  </div>
                ))
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="text-lg font-semibold text-eatery-light hover:no-underline">Price Range</AccordionTrigger>
          <AccordionContent className="pt-6">
            <Slider
              min={0}
              max={maxPrice}
              step={1}
              value={[priceRange[0], Math.min(priceRange[1], maxPrice)]}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="[&_[role=slider]]:bg-eatery-gold [&_[role=slider]]:border-eatery-gold"
            />
            <div className="mt-4 flex justify-between text-sm text-slate-400">
              <span>${priceRange[0]}</span>
              <span>${Math.min(priceRange[1], maxPrice)}</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}