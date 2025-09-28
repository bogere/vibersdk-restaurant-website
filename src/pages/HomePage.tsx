import { Button } from '@/components/ui/button';
import { FilterSidebar } from '@/components/FilterSidebar';
import { MenuGrid } from '@/components/MenuGrid';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
function HeroSection() {
  const scrollToMenu = () => {
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className="relative overflow-hidden py-32 md:py-48">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop')"}}
      >
        <div className="absolute inset-0 bg-eatery-dark/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-eatery-gold/10 via-transparent to-eatery-gold/10 opacity-50 animate-[pulse_5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl font-extrabold tracking-tight text-eatery-light sm:text-6xl md:text-7xl"
        >
          A Modern Culinary <span className="text-eatery-gold">Experience</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-slate-300"
        >
          Discover a symphony of flavors crafted with passion and the finest ingredients. Welcome to Aetheria Eatery.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >
          <Button
            size="lg"
            onClick={scrollToMenu}
            className="bg-eatery-gold px-8 py-4 text-lg font-bold text-eatery-dark transition-transform hover:scale-105 hover:bg-eatery-gold/90"
          >
            Order Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
export function HomePage() {
  const isMobile = useIsMobile();
  return (
    <div>
      <HeroSection />
      <section id="menu-section" className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {isMobile ? (
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-display text-3xl font-bold text-eatery-light">Our Menu</h2>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-eatery-light">
                      <SlidersHorizontal className="h-5 w-5" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full max-w-sm bg-eatery-dark border-l-slate-800 text-eatery-light">
                    <FilterSidebar />
                  </SheetContent>
                </Sheet>
              </div>
            ) : (
              <aside className="hidden lg:col-span-3 lg:block">
                <div className="sticky top-24">
                  <FilterSidebar />
                </div>
              </aside>
            )}
            <div className={isMobile ? "col-span-full" : "lg:col-span-9"}>
              {!isMobile && <h2 className="font-display text-4xl font-bold text-eatery-light mb-8">Our Menu</h2>}
              <MenuGrid />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}