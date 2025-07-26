import { Icon } from "@/components/icon";
import { Skeleton } from "@/components/ui/skeleton";

export default function FormVerificationLoading() {
  return (
    <div className="max-w-4xl mx-auto my-2 bg-white p-5 rounded-lg relative">
      <div>
        <Skeleton className="w-1/3 mx-auto h-6" />
      </div>
      <div className="grid md:grid-cols-2 max-w-xl gap-4 mx-auto mt-6">
        <Skeleton className="w-full aspect-[3/4]" />
        <Skeleton className="w-full aspect-[3/4]" />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mx-auto mt-6">
        <Skeleton className="w-full aspect-[8/5]" />
        <Skeleton className="w-full aspect-[8/5]" />
      </div>
      <div className="absolute z-10 flex items-center justify-center top-0 right-0 bottom-0 left-0">
        <Icon className="animate-spin text-3xl" name="mingcute:loading-fill" />
      </div>
    </div>
  )
}
