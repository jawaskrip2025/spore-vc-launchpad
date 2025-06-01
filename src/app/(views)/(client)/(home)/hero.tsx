'use client'
import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const rocketRef = useRef<HTMLDivElement>(null)
  const illRef1 = useRef<HTMLDivElement>(null)
  const illRef2 = useRef<HTMLDivElement>(null)
  const illRef3 = useRef<HTMLDivElement>(null)
  const illRef4 = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const speed = 1
      if (rocketRef.current) {
        rocketRef.current.style.transform = `translateY(-${scrollY * speed}px)`
      }
      if (illRef1.current) {
        illRef1.current.style.transform = `translateY(-${scrollY * speed * 0.4}px)`
      }
      if (illRef2.current) {
        illRef2.current.style.transform = `translateY(-${scrollY * speed * 0.3}px)`
      }
      if (illRef3.current) {
        illRef3.current.style.transform = `translateY(-${scrollY * speed * 0.2}px)`
      }
      if (illRef4.current) {
        illRef4.current.style.transform = `translateY(-${scrollY * speed * 0.1}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <section className='md:h-[100vh] overflow-hidden flex items-center relative'>
      <div className='absolute left-0 top-0 right-0 bottom-0 z-0'>
        <Image className='h-full w-full md:object-cover opacity-20 dark:opacity-30 object-top' alt='rocket' src={'/ills/waves-1.png'} width={1000} height={1000} />
      </div>
      <div className='pt-[80px] container relative z-10'>
        <div className="grid md:grid-cols-2 items-center">
          <div className='order-1 md:order-0'>
            <div className='space-y-2 md:space-y-8 text-center md:text-start'>
              <h1 className='text-3xl md:text-6xl font-bold max-w-xl dark:bg-gradient-to-r dark:from-[#4B2CEB] dark:via-[#1B8DFA] dark:to-[#6C86FF] inline-block dark:text-transparent dark:bg-clip-text'>Board the Next RWA Token Launch</h1>
              <p className='text-sm sm:text-lg md:text-2xl max-w-lg dark:text-blue-200'>
                Early access to verified, high-potential RWA project tokens before public sale.
              </p>
            </div>
            <div className="mt-6 md:mt-10 flex justify-center md:justify-start">
              <Button size={"lg"} className='bg-gradient-to-tr text-blue-100 from-[#4B2CEB] via-[#1B8DFA] to-[#6C86FF] hover:via-30% transition'>
                <Icon name='mingcute:rocket-fill' /> Launch Your Asset
              </Button>
            </div>
          </div>
          <div className='order-0 md:order-1 relative mb-4 md:mb-12 md:mt-12'>
            <div ref={rocketRef} className='max-w-xl md:-mt-6 mx-auto aspect-video will-change-transform relative z-0'>
              <Image className='object-contain bounce-bottom w-24 md:w-52 mx-auto' alt='rocket' src={'/images/rocket.png'} width={622} height={996} />
            </div>
            <div className='flex flex-wrap justify-center grid-cols-2 gap-4 z-20'>
              {/* ref={illRef1} */}
              <div  className='px-4 py-2.5 bg-blue-500/20 text-blue-600 rounded-full inline-flex gap-2 items-center max-w-max backdrop-blur top-3'>
                <Icon name='bi:coin' />
                <p className='text-sm font-semibold'>Stable Coin</p>
              </div>
              {/* ref={illRef2} */}
              <div  className='px-4 py-2.5 bg-blue-500/20 text-blue-600 rounded-full inline-flex gap-2 items-center max-w-max backdrop-blur top-3 right-4'>
                <Icon name='material-symbols:chart-data' />
                <p className='text-sm font-semibold'>Private Founds</p>
              </div>
              {/* ref={illRef3}  */}
              <div className='px-4 py-2.5 bg-blue-500/20 text-blue-600 rounded-full inline-flex gap-2 items-center max-w-max backdrop-blur -top-1/3 left-1/2'>
                <Icon name='mingcute:house-2-fill' />
                <p className='text-sm font-semibold'>Real Estate</p>
              </div>
              {/* ref={illRef4} */}
              <div  className='px-4 py-2.5 bg-blue-500/20 text-blue-600 rounded-full inline-flex gap-2 items-center max-w-max backdrop-blur -top-1/3 left-12'>
                <Icon name='stash:hand-holding-dollar-solid' />
                <p className='text-sm font-semibold'>RWA Lending</p>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-12'>
          <CardItem title='$59M' subtitle='Contributions' />
          <CardItem title='$109M' subtitle='Distributions' />
          <CardItem title='120+' subtitle='Assets' />
          <CardItem title='200+' subtitle='Verified' />
        </div>
      </div>
    </section>
  )
}

const CardItem = (props: {title:string,subtitle:string}) => {
  return (
    <div className='text-center bg-gradient-to-tr dark:text-blue-600 from-blue-100/10 dark:to-blue-800/20 to-blue-200/20 border border-blue-500/10 backdrop-blur p-6 rounded-md'>
      <h2 className='text-3xl font-bold'>{props.title}</h2>
      <p className='text-sm dark:text-blue-300'>{ props.subtitle}</p>
    </div>
  )
}
