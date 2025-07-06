'use client'
import { Icon } from '@/components/icon'
import { NumberComma } from '@/lib/utils'
import { TToken } from '@/models/token'
import { useMyToken } from '@/modules/tokens/token.query'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

export default function Upcoming() {
  const { data } = useMyToken()

  console.log({ data })
  return (
    <section className='py-12 md:py-24 bg-primary-foreground/10'>
      <div className="container">
        <div className='text-center max-w-xl mx-auto mb-12'>
          <h2 className='text-2xl md:text-4xl font-bold max-w-xl'>RWA Token Sale Launchpad</h2>
          <p>Join a community of investors focused on real-world asset tokens.</p>
        </div>
        <div className='flex justify-between mb-3'>
          <h3 className='text-xl md:text-2xl font-bold'>Upcoming RWA Projects</h3>
          <Link className='text-sm font-semibold text-primary' href={'/'}>Show All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
          {
            data?.map((item,index) => (
              <Fragment key={index}>
                <ProjectItem
                  name={item.name}
                  symbol={item.symbol}
                  chain={item.chain}
                  category={item.category}
                  description={item.description ?? ""}
                  supply={item.supply}
                  status={item.status ?? ""}
                  allocations={item.allocations}
                  presales={item?.presales ?? []}
                  file={item?.file}
                  id={item.id}
                  socials={item.socials} />
              </Fragment>
            ))
          }
        </div>
      </div>
    </section>
  )
}

const ProjectItem = (props: TToken) => {
  return (
    <div className='relative bg-blue-500/5 cursor-pointer dark:bg-primary-foreground/50 p-2 rounded-xl hover:scale-105 duration-300'>
      <div className="absolute top-4 right-4 z-20 py-1 px-2 bg-primary/20 text-white rounded-full inline-flex gap-2 items-center text-xs font-bold backdrop-blur">Upcoming</div>
      <div className='aspect-square relative z-10'>
        <Image fill alt='aset' className='z-10 rounded-xl object-cover' src={ props?.file ?? '/images/dummy-1.png'} />
        <div className="absolute -bottom-7 left-7 h-14 w-14 p-1 bg-white z-10 rounded-full overflow-hidden">
          <Image width={100} height={100} alt='aset' className='w-full h-full object-cover rounded-full' src={props?.file ?? '/images/dummy-1.png'} />
        </div>
      </div>
      <div className='pl-24 flex justify-end gap-1 mt-2'>
        <BadgeSocial url='https://goole.com' icon={'ci:globe'} />
        <BadgeSocial url='https://goole.com' icon={'ri:twitter-x-line'} />
        <BadgeSocial url='https://goole.com' icon={'ic:baseline-discord'} />
      </div>
      <div className='px-3 pb-3 pt-6'>
        <div className='space-y-2'>
          <div className="flex items-center justify-between">
            <h2 className='text-xl font-bold'>{props.name}</h2>
            {props.chain}
            <Image
              width={100}
              height={100}
              alt='aset'
              className='w-7 h-7 object-cover rounded-full'
              src={`/images/networks/${props.chain}.png` || '/icons/networks/3.png'}
            />
          </div>
          <p className='text-sm line-clamp-2 w-full break-all'>
            {props.description}
          </p>
        </div>
        <div className='mt-4'>
          <div className='flex justify-between text-sm font-semibold'>
            <div>Total Supply:</div>
            <div>{NumberComma(props.supply)}</div>
          </div>
          <div className='flex justify-between text-sm font-semibold'>
            <div>Max Allocation:</div>
            <div>{ props.allocations.find(i=>i.allocation === "Presale")?.supply} %</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const BadgeSocial = (props: { icon: string, url: string }) => {
  return (
    <Link href={props.url} target="_blank" rel="noopener noreferrer" className='bg-blue-200 text-blue-700 rounded-md flex items-center gap-1 p-1 text-xs'>
      <Icon className='text-lg' name={props.icon} />
    </Link>
  )
}
