import React from 'react'

type CardCounterItemProps = {
  label: string
  count: string
  unit: string
}
export default function CardCounterItem(props: CardCounterItemProps) {
  return (
    <div className='border p-3 md:p-4 rounded-xl bg-white dark:bg-white/5'>
      <h2 className='text-sm'>{props.label}</h2>
      <div className='flex items-center gap-2 mt-3'>
        <h3 className='text-2xl font-bold'>{ props.count}</h3>
        <p className='text-xs'>{ props.unit}</p>
      </div>
    </div>
  )
}
