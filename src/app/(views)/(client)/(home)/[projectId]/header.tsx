import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { toUrlAsset } from '@/lib/utils'
import { TProject } from '@/types/project'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function DetailHeader({ data }: { data: TProject }) {
  return (
    <header className='pt-[120px] pb-24 md:pb-12 w-full aspect-auto md:aspect-[12/6] lg:aspect-[1200/300] relative'>
      <div className='absolute left-0 top-0 right-0 bottom-0 z-0'>
        <Image className='h-full object-cover w-full dark:hidden opacity-50' alt='rocket' src={'/ills/ill-2-light.png'} width={1200} height={275} />
        <Image className='h-full object-cover w-full hidden dark:block opacity-50' alt='rocket' src={'/ills/ill-2.png'} width={1200} height={275} />
      </div>
      <div className="container relative z-10 h-full flex items-center">
        <div className="grid md:grid-cols-2 w-full gap-4 items-start">
          <div>
            <div className='flex gap-4 items-center'>
              <div className='h-24 w-24 border rounded-xl overflow-hidden'>
                <Image className='h-full w-full object-cover' width={80} height={80} alt='name' src={toUrlAsset(data.logo)} />
              </div>
              <div className='space-y-1'>
                <h1 className='text-xl font-bold'>{data.name}</h1>
                <div className='flex items-center gap-2'>
                  <Icon name={data.category.icon} />
                  <p>{data.category.name}</p>
                </div>
                <div className='flex items-center gap-2'>
                  {
                    data.chains.map((item, index) => (
                      <div key={index} className='flex gap-2 items-center'>
                        <div className='h-5 w-5 rounded-full overflow-hidden'>
                          <Image className='h-full w-full object-cover' width={80} height={80} alt='name' src={toUrlAsset(item.chain.logo)} />
                        </div>
                        <p>{item.chain.name}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <h2 className='text-lg'>Media & Community</h2>
            <div className='flex gap-2 flex-wrap mt-4'>
              {
                data.socials.map((item, index) => (
                  <BadgeSocial
                    key={index}
                    icon={item.social.icon}
                    url={item.url}
                    name={item.social.name}
                  />
                ))
              }
            </div>
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            <Button>Buy On {`(Uniswap)`}</Button>
            <Button>Buy On {`(Binance)`}</Button>
            <Button>Buy On {`(Where?)`}</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

const BadgeSocial = (props: { icon: string, url: string, name: string }) => {
  return (
    <Link href={props.url} target="_blank" rel="noopener noreferrer" className='bg-blue-200 text-blue-700 rounded-md px-3 flex items-center gap-1 p-1 text-xs'>
      <Icon className='text-lg' name={props.icon} />
      <p>{props.name}</p>
    </Link>
  )
}
