'use client'
import { Icon } from '@/components/icon'
import { navmenus } from '@/data/menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavMenu() {
  const pathname = usePathname()
  return (
    <div className='flex w-full justify-around items-center'>
      {
        navmenus.map((item, index) => (
          <Link key={index} href={item.path} className={cn(
            'flex items-center gap-2'
          )}>
            <Icon className={cn(
              'text-lg',
              pathname === item.path && 'text-[#1B8DFA]'
            )} name={item.icon} />
            <p className={cn(
              'text-sm',
              pathname === item.path && 'bg-gradient-to-r font-semibold from-[#4B2CEB] via-[#1B8DFA] to-[#6C86FF] inline-block text-transparent bg-clip-text'
            )}>{item.label}</p>
          </Link>
        ))
      }
    </div>
  )
}
