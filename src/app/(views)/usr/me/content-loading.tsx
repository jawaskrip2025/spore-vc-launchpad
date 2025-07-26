import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const generateArray = (n: number): number[] => {
  return Array.from({ length: n }, (_, i) => i + 1);
};
export default function ContentLoading({ count }: { count: number }) {
  const x = generateArray(count || 3)
  return (
    <div>
      {
        x.map(i => (
          <div key={i} className="flex gap-2 my-2">
            <Skeleton className='h-10 w-1/3' />
            <Skeleton className='h-10 flex-1' />
          </div>
        ))
      }
    </div>
  )
}
