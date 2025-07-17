'use client'
import MainLogo from '@/components/logo'
import React from 'react'
import Sidemenu from './sidemenu'
import { cn } from '@/lib/utils'
import { useSidemenu } from '@/store/useSidemenu'

export default function Sidebar() {
  const { open } = useSidemenu()
  return (
    <div className={cn(
      'p-4 border-r flex flex-col h-full transition',
      'w-[270px]',
      'fixed md:relative z-30',
      !open ? '-translate-x-full md:-translate-x-0' :'-translate-x-0',
      'bg-white dark:bg-neutral-950'
    )}>
      <div className='h-16 flex items-center'>
        <MainLogo />
      </div>
      <div className="flex-1">
        <Sidemenu />
      </div>
    </div>
  )
}
