import { Utensils, ShoppingBag, User as UserIcon, LogOut, History, LogIn } from 'lucide-react';
import { useCartStore, useCartTotalItems } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
export function Header() {
  const toggleDrawer = useCartStore((state) => state.toggleDrawer);
  const totalItems = useCartTotalItems();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const openAuthDialog = useAuthStore((state) => state.openAuthDialog);
  const handleLogout = () => {
    logout();
    toast.info("You have been logged out.");
  };
  return (
    <header className="sticky top-0 z-40 w-full border-b border-eatery-dark/10 bg-eatery-dark/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Utensils className="h-8 w-8 text-eatery-gold" />
          <span className="font-display text-2xl font-bold text-eatery-light">
            Aetheria Eatery
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-eatery-light transition-colors hover:bg-eatery-light/10 hover:text-eatery-gold"
            onClick={toggleDrawer}
          >
            <ShoppingBag className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-eatery-gold text-xs font-bold text-eatery-dark">
                {totalItems}
              </span>
            )}
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-eatery-gold/50">
                    <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`} alt={user.name} />
                    <AvatarFallback className="bg-slate-700 text-eatery-light">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-eatery-dark border-slate-800 text-eatery-light" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-slate-400">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-slate-800 focus:text-eatery-light">
                  <Link to="/order-history">
                    <History className="mr-2 h-4 w-4" />
                    <span>Order History</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer focus:bg-red-900/50 focus:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              className="border-eatery-gold/50 text-eatery-gold hover:bg-eatery-gold hover:text-eatery-dark"
              onClick={openAuthDialog}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}