'use client'
import { useProjectDetail } from '@/modules/project/project.query'
import { useParams } from 'next/navigation'
import DetailHeader from './header'
import PresaleInfo from './presale-info'
import TokenInfo from './token-info'
import { FormBuyPresale } from './form-buy-presale'

export default function DetailProjectContent() {
  const { projectId } = useParams()
  const { data, isLoading } = useProjectDetail(projectId as string)
  return (
    <div>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {data && <DetailHeader data={data} />}
            {data && <TokenInfo data={data} />}
            {data && <PresaleInfo data={data} />}
          </>
        )
      }
      {
        data && (
          <div className='mt-3 flex justify-end container sticky bottom-0 z-30 pb-6 px-4 md:px-0'>
            <FormBuyPresale data={data?.presales} />
          </div>
        )
      }
      
    </div>
  )
}
