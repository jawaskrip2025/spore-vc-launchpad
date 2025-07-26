import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function CardLoader() {
  return (
    <div className='p-3 md:p-4 rounded-xl bg-white dark:bg-white/5'>
      <Skeleton className='w-24 h-5' />
      <div className='flex items-center gap-2 mt-5'>
        <Skeleton className='w-10 h-6' />
        <Skeleton className='flex-1 h-3' />
      </div>
    </div>
  )
}
