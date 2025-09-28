import { Utensils, Twitter, Instagram, Facebook } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-eatery-dark border-t border-eatery-light/10 text-eatery-light">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <Utensils className="h-8 w-8 text-eatery-gold" />
              <span className="font-display text-2xl font-bold">
                Aetheria Eatery
              </span>
            </a>
            <p className="text-sm text-slate-400">A Modern Culinary Experience</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 transition-colors hover:text-eatery-gold">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-slate-400 transition-colors hover:text-eatery-gold">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-slate-400 transition-colors hover:text-eatery-gold">
              <Facebook className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-eatery-light/10 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Aetheria Eatery. All rights reserved.</p>
          <p className="mt-1">Built with ❤️ at Cloudflare</p>
        </div>
      </div>
    </footer>
  );
}