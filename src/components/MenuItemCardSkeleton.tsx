import { Skeleton } from '@/components/ui/skeleton';
export function MenuItemCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50">
      <Skeleton className="aspect-h-9 aspect-w-16 w-full" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4 rounded" />
          <Skeleton className="mt-3 h-4 w-full rounded" />
          <Skeleton className="mt-2 h-4 w-5/6 rounded" />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <Skeleton className="h-7 w-1/4 rounded" />
          <Skeleton className="h-9 w-1/3 rounded-md" />
        </div>
      </div>
    </div>
  );
}