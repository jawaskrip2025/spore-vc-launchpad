import React from 'react'
import CardCounterItem from './card-counter-item'

export default function CardCounter() {
  return (
    <div className='mt-6'>
      <h2>Poject Overview</h2>
      <div className='grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 mt-2'>
        <CardCounterItem label='Approved' count='3' unit='Projects' />
        <CardCounterItem label='Rejected' count='1' unit='Projects' />
        <CardCounterItem label='Pending' count='3' unit='Projects' />
        <CardCounterItem label='Deployed' count='2' unit='Projects' />
      </div>
    </div>
  )
}
