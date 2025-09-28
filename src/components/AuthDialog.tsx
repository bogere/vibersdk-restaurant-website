import { useAuthStore, MOCK_USER } from '@/store/authStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
export function AuthDialog() {
  const isAuthDialogOpen = useAuthStore((state) => state.isAuthDialogOpen);
  const closeAuthDialog = useAuthStore((state) => state.closeAuthDialog);
  const login = useAuthStore((state) => state.login);
  const handleLogin = () => {
    login(MOCK_USER);
    toast.success(`Welcome back, ${MOCK_USER.name}!`);
    closeAuthDialog();
  };
  return (
    <Dialog open={isAuthDialogOpen} onOpenChange={closeAuthDialog}>
      <DialogContent className="bg-eatery-dark border-slate-800 text-eatery-light sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Login to Your Account</DialogTitle>
          <DialogDescription className="text-slate-400">
            This is a mock login. Click below to sign in with a demo account.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={MOCK_USER.email} readOnly className="bg-slate-900/50 border-slate-700" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value="••••••••••••" readOnly className="bg-slate-900/50 border-slate-700" />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleLogin}
            className="w-full bg-eatery-gold text-eatery-dark font-bold hover:bg-eatery-gold/90"
          >
            Sign In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}