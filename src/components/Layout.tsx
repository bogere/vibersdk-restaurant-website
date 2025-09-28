import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Toaster } from '@/components/ui/sonner';
import { CartDrawer } from './CartDrawer';
import { CheckoutDialog } from './CheckoutDialog';
import { AuthDialog } from './AuthDialog';
export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-eatery-dark text-eatery-light">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <CheckoutDialog />
      <AuthDialog />
      <Toaster richColors theme="dark" position="bottom-right" />
    </div>
  );
}