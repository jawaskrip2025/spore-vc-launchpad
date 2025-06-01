import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Icon } from './icon'

export default function WalletButton({ withText }: { withText?: boolean }) {
  return (
    <div>
      <Button className='hidden md:flex'>
        <Icon name='solar:wallet-2-bold' />
        <p>Connect</p>
      </Button>
      <Button size={withText ? "default" : "icon"} className='md:hidden'>
        <Icon name='solar:wallet-2-bold' />
        <p className={cn(
          withText ? 'block' : 'hidden'
        )}>Connect</p>
      </Button>
    </div>
  )
}
