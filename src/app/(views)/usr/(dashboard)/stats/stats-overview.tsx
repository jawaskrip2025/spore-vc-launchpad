import React from 'react'

export default function StatsOverview() {
  return (
    <div className='mt-6'>
      <h2>Stats Overview</h2>
      <div className='grid md:grid-cols-2 mt-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4'>
        <div className='md:col-span-4 xl:col-span-3 aspect-video flex items-center justify-center border p-3 rounded-xl bg-white dark:bg-white/5'>
          Line/Area Chart
        </div>
        <div className='md:col-span-4 xl:col-span-2 aspect-video xl:aspect-auto flex items-center justify-center border p-3 rounded-xl bg-white dark:bg-white/5'>
          Pie Chart
        </div>
      </div>
    </div>
  )
}
