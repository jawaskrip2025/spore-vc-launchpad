import { Icon } from '@/components/icon'
import React from 'react'

export default function LoadingConnect() {
  return (
    <section className="relative">
      <div className='container min-h-[45vh] flex items-center justify-center relative z-10 backdrop-blur'>
        <Icon className='text-3xl animate-spin' name='bx:loader-circle' />
      </div>
    </section>
  )
}
