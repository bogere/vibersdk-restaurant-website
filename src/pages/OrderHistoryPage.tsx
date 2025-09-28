import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api-client';
import type { Order } from '@shared/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileText, AlertCircle, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
function OrderCard({ order }: { order: Order }) {
  return (
    <Card className="bg-slate-900/50 border-slate-800 text-eatery-light overflow-hidden transition-all hover:border-eatery-gold/30 hover:shadow-lg hover:shadow-eatery-gold/10">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-eatery-gold">Order ID: {order.id.substring(0, 8)}</CardTitle>
            <CardDescription className="text-slate-400">
              Placed on: {new Date(order.createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-eatery-light">${order.total.toFixed(2)}</p>
            <p className="text-xs text-slate-500">{order.items.length} items</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-slate-800">
            <AccordionTrigger className="text-slate-300 hover:no-underline">View Details</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm text-slate-400">
                    <p>Product ID: {item.productId.substring(0, 8)}... (x{item.quantity})</p>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div className="pt-2 text-sm">
                  <p className="font-semibold text-slate-300">Shipped to:</p>
                  <p className="text-slate-400">{order.shippingAddress}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
function OrderHistorySkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32 mt-2" />
              </div>
              <Skeleton className="h-8 w-24" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
export function OrderHistoryPage() {
  const user = useAuthStore((state) => state.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (user?.email) {
      const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const fetchedOrders = await api<Order[]>(`/api/orders/history/${user.email}`);
          setOrders(fetchedOrders.sort((a, b) => b.createdAt - a.createdAt));
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch order history.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [user]);
  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 opacity-[0.02] [background-image:radial-gradient(white,transparent_2px)] [background-size:32px_32px]"></div>
      <div className="container relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-eatery-light sm:text-5xl">Order History</h1>
          <p className="mt-4 text-lg text-slate-400">Review your past orders with Aetheria Eatery.</p>
        </div>
        {!user ? (
          <Alert variant="destructive" className="bg-red-900/20 border-red-500/30 text-red-400">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You must be logged in to view your order history.
            </AlertDescription>
          </Alert>
        ) : isLoading ? (
          <OrderHistorySkeleton />
        ) : error ? (
          <Alert variant="destructive" className="bg-red-900/20 border-red-500/30 text-red-400">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-slate-800 rounded-lg bg-slate-900/30">
            <FileText className="mx-auto h-12 w-12 text-slate-600" />
            <h3 className="mt-4 text-xl font-semibold text-slate-300">Your culinary journey is yet to begin!</h3>
            <p className="mt-2 text-slate-500">You haven't placed any orders yet. Let's change that.</p>
            <Button asChild className="mt-6 bg-eatery-gold text-eatery-dark font-bold hover:bg-eatery-gold/90 transition-transform hover:scale-105">
              <Link to="/"><ShoppingBag className="mr-2 h-4 w-4" />Explore the Menu</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}