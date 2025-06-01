'use client'
import React from 'react';
import { Icon as Iconify } from '@iconify-icon/react';
import { cn } from '@/lib/utils';

type TIconify = {
  name: string
  className?: string
}
export function Icon({ name, className}: TIconify) {
  return (
    <>
      <Iconify className={cn(
        'text-xl',
        className
      )} icon={name} />
    </>
  );
}