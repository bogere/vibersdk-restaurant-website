import { Drawer } from 'vaul';
import { useCartStore, useCartItems, useCartTotalPrice, useIsCartDrawerOpen } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import type { CartItem } from '@shared/types';
function CartDrawerItem({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  return (
    <div className="flex items-center gap-4 py-4">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="h-20 w-20 rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-eatery-light">{item.name}</h3>
        <p className="text-sm text-slate-400">${item.price.toFixed(2)}</p>
        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 border-slate-700 bg-transparent text-slate-400 hover:bg-slate-800 hover:text-eatery-light"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-6 text-center font-medium text-eatery-light">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 border-slate-700 bg-transparent text-slate-400 hover:bg-slate-800 hover:text-eatery-light"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between self-stretch">
        <p className="font-semibold text-eatery-light">${(item.price * item.quantity).toFixed(2)}</p>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-500 hover:bg-red-500/10 hover:text-red-500"
          onClick={() => removeItem(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
export function CartDrawer() {
  const isOpen = useIsCartDrawerOpen();
  const setDrawerOpen = useCartStore((state) => state.setDrawerOpen);
  const items = useCartItems();
  const totalPrice = useCartTotalPrice();
  const clearCart = useCartStore((state) => state.clearCart);
  const openCheckout = useCheckoutStore((state) => state.openCheckout);
  const handleProceedToCheckout = () => {
    setDrawerOpen(false);
    openCheckout();
  };
  return (
    <Drawer.Root open={isOpen} onOpenChange={setDrawerOpen} direction="right">
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <Drawer.Content className="fixed bottom-0 right-0 top-0 z-50 mt-0 flex h-full w-full max-w-md flex-col rounded-l-lg bg-eatery-dark border-l border-slate-800">
          <div className="flex-1 rounded-l-lg bg-eatery-dark p-4">
            <div className="mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-slate-700" />
            <div className="flex items-center justify-between pb-4">
              <Drawer.Title className="font-display text-2xl font-bold text-eatery-light">
                Your Order
              </Drawer.Title>
              <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)} className="text-slate-400 hover:bg-slate-800 hover:text-eatery-light">
                <X className="h-5 w-5" />
              </Button>
            </div>
            {items.length > 0 ? (
              <>
                <ScrollArea className="h-[calc(100vh-220px)] pr-4">
                  <div className="flex flex-col divide-y divide-slate-800">
                    {items.map((item) => (
                      <CartDrawerItem key={item.id} item={item} />
                    ))}
                  </div>
                </ScrollArea>
                <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 bg-eatery-dark p-4">
                  <div className="flex items-center justify-between text-lg font-semibold text-eatery-light">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Taxes and shipping calculated at checkout.</p>
                  <Button
                    size="lg"
                    className="mt-4 w-full bg-eatery-gold text-eatery-dark font-bold transition-transform hover:scale-105 hover:bg-eatery-gold/90"
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="mt-2 w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-eatery-light" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-lg font-medium text-slate-400">Your cart is empty</p>
                <p className="mt-2 text-sm text-slate-500">Add some delicious items from the menu!</p>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}