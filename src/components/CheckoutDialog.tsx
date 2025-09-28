import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useCartStore, useCartItems, useCartTotalPrice } from '@/store/cartStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Loader2, ArrowRight, ShoppingBag, CheckCircle } from 'lucide-react';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import type { OrderItem } from '@shared/types';
const checkoutSchema = z.object({
  customerName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  customerEmail: z.string().email({ message: "Please enter a valid email address." }),
  shippingAddress: z.string().min(10, { message: "Address must be at least 10 characters." }),
});
type CheckoutFormValues = z.infer<typeof checkoutSchema>;
export function CheckoutDialog() {
  const isCheckoutOpen = useCheckoutStore((state) => state.isCheckoutOpen);
  const closeCheckout = useCheckoutStore((state) => state.closeCheckout);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartTotalPrice();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrderId, setSubmittedOrderId] = useState<string | null>(null);
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      shippingAddress: '',
    },
  });
  const handleNextStep = () => setStep(2);
  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    try {
      const orderItems: OrderItem[] = items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));
      const orderPayload = {
        ...data,
        items: orderItems,
        total: totalPrice,
      };
      const response = await api<{ orderId: string; message: string }>('/api/orders', {
        method: 'POST',
        body: JSON.stringify(orderPayload),
      });
      setSubmittedOrderId(response.orderId);
      setStep(3); // Move to success step
      clearCart();
    } catch (error) {
      toast.error("Order Failed", {
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleClose = () => {
    closeCheckout();
    // Reset state after a short delay to allow for closing animation
    setTimeout(() => {
      form.reset();
      setStep(1);
      setSubmittedOrderId(null);
    }, 300);
  };
  return (
    <Dialog open={isCheckoutOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-eatery-dark border-slate-800 text-eatery-light sm:max-w-lg">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Shipping Details</DialogTitle>
              <DialogDescription className="text-slate-400">
                Please provide your information to complete the order.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleNextStep)} className="space-y-6 pt-4">
                <FormField control={form.control} name="customerName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} className="bg-slate-900/50 border-slate-700 focus:ring-eatery-gold" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="customerEmail" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input type="email" placeholder="you@example.com" {...field} className="bg-slate-900/50 border-slate-700 focus:ring-eatery-gold" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="shippingAddress" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Address</FormLabel>
                    <FormControl><Input placeholder="123 Culinary Lane, Flavor Town" {...field} className="bg-slate-900/50 border-slate-700 focus:ring-eatery-gold" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full bg-eatery-gold text-eatery-dark font-bold hover:bg-eatery-gold/90">
                  Review Order <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </>
        )}
        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Confirm Your Order</DialogTitle>
              <DialogDescription className="text-slate-400">
                Review your items and place your order.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <ScrollArea className="h-48 pr-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-semibold">{item.name} <span className="text-slate-400 text-sm">x{item.quantity}</span></p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </ScrollArea>
              <Separator className="my-4 bg-slate-800" />
              <div className="space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Taxes & Fees</span>
                  <span>Calculated at next step</span>
                </div>
                <Separator className="my-2 bg-slate-800" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)} className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-eatery-light">Back</Button>
              <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting} className="w-full bg-eatery-gold text-eatery-dark font-bold hover:bg-eatery-gold/90">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShoppingBag className="mr-2 h-4 w-4" />}
                Place Order
              </Button>
            </div>
          </>
        )}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <DialogTitle className="font-display text-2xl mt-4">Order Placed Successfully!</DialogTitle>
            <DialogDescription className="text-slate-400 mt-2">
              Your order ID is <span className="font-mono text-eatery-gold">{submittedOrderId}</span>.
            </DialogDescription>
            <Button onClick={handleClose} className="mt-6 w-full bg-eatery-gold text-eatery-dark font-bold hover:bg-eatery-gold/90">
              Continue Shopping
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}