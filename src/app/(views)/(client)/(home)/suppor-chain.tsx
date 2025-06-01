import Image from 'next/image'
import React from 'react'

export default function SupporChain() {
  return (
    <section className='py-12 bg-blue-100/30 dark:bg-primary-foreground/40'>
      <div className="container">
        <div className='text-center max-w-xl mx-auto mb-5'>
          <h2 className='text-2xl md:text-4xl font-bold max-w-xl'>Blockchains Supported</h2>
          <p className='text-sm md:text-base'>Discover and invest in top real-world asset (RWA) projects across multiple supported blockchains, all in one platform.</p>
        </div>
        <div className="flex justify-center gap-4">
            <Image width={60} height={60} alt='chain' className='w-12 h-12 md:h-20 md:w-20' src={'/icons/networks/1.png'} />
            <Image width={60} height={60} alt='chain' className='w-12 h-12 md:h-20 md:w-20' src={'/icons/networks/2.png'} />
            <Image width={60} height={60} alt='chain' className='w-12 h-12 md:h-20 md:w-20' src={'/icons/networks/3.png'} />
            <Image width={60} height={60} alt='chain' className='w-12 h-12 md:h-20 md:w-20' src={'/icons/networks/4.png'} />
            <Image width={60} height={60} alt='chain' className='w-12 h-12 md:h-20 md:w-20' src={'/icons/networks/5.png'} />
        </div>
      </div>
    </section>
  )
}
