import { Skeleton } from "./ui/skeleton"

const TableSubscriptionSkeleton = () => {
  return (
    <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <Skeleton key={i} className="h-12 w-full" />
    ))}
  </div>
  )
}

export default TableSubscriptionSkeleton