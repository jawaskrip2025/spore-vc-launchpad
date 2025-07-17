'use client';
import { Icon } from '@/components/icon';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
type SidemenuItemProps = {
  label: string
  icon?: string
  isActive?: boolean
  path:string
} & React.ButtonHTMLAttributes<HTMLButtonElement>
export default function SidemenuItem({
  label,
  icon ='hugeicons:blockchain-03',
  isActive,
  path,
}: SidemenuItemProps) {

  return (
    <Link href={path} className={cn(
      isActive ? 'bg-slate-950 text-white dark:bg-white/5 pl-3' : 'hover:bg-slate-50 hover:dark:bg-slate-50/5',
      'transition-all duration-300',
      'w-full my-1 flex items-center gap-2 pr-3 py-2.5 rounded-2xl',
      'hover:pl-3'
    )}>
      <Icon name={icon} />
      <p className='text-sm font-medium'>{label}</p>
    </Link>
  )
}
