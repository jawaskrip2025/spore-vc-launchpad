import Image from 'next/image'
import React from 'react'

export default function MainLogo() {
  return (
    <div className='h-8 aspect-[512/165]'>
      <Image
        className='w-full h-full object-cover dark:hidden'
        src='/logo/logo-dark.png'
        alt='logo'
        width={120} height={120}
      />

      <Image
        className='w-full h-full object-cover hidden dark:block'
        src='/logo/logo-light.png'
        alt='logo'
        width={120} height={120}
      />
    </div>
  )
}
