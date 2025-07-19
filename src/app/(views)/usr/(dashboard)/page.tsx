import CardCounter from './projects/card-counter'
import StatsOverview from './stats/stats-overview'

export default function DashboardPage() {
  return (
    <div className='my-5'>
      <CardCounter />
      <StatsOverview />
    </div>
  )
}
