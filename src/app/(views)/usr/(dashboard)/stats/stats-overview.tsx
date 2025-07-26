'use client'
import { useCounterProject } from '@/modules/project-stats/project-stats.query'
import ChartCounterProject from './chart-counter-project'
import LineChartProject from './line-chart-project'

export default function StatsOverview() {
    const { data, isLoading } = useCounterProject()
  return (
    <div className='mt-6'>
      <h2>Stats Overview</h2>
      <div className='grid md:grid-cols-2 mt-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4'>
        <div className='md:col-span-4 xl:col-span-2 aspect-video xl:aspect-auto flex items-center justify-center border p-3 rounded-xl bg-white dark:bg-white/5'>
          {!isLoading && data && (
            <ChartCounterProject data={data} />
          )}
        </div>
        <div className='md:col-span-4 xl:col-span-3 aspect-video flex items-center justify-center border p-3 rounded-xl bg-white dark:bg-white/5'>
          {/* Line/Area Chart */}
          <LineChartProject />
        </div>
      </div>
    </div>
  )
}
