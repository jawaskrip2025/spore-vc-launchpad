'use client'

import { Icon } from "@/components/icon"
import { toUrlAsset } from "@/lib/utils"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import Allocations from "./allocations"
import ChartAllocations from "./chart-allocations"
import { ReviewLog } from "./review-log"
import RowItem from "./row-item"
import { useProjectDetail } from "@/modules/project/project.query"

export default function ProjectContent() {
  const { projectId } = useParams()
  const { data, isLoading } = useProjectDetail(projectId.toString())
  return (
    <>
      {
        !isLoading && data ? (
          <div className="relative pb-8">
            <div>
              <div className="w-full h-[30vh] border border-dashed p-2 bg-slate-500/5">
                <Image className="w-full h-full object-contain" width={1200} height={1200} src={toUrlAsset(data.banner)} alt={data?.banner} />
              </div>
              <div className="my-3">
                <div className="flex flex-col md:flex-row justify-between mb-2 ">
                  <h2 className="text-lg font-semibold">Project Info</h2>
                  <div className="flex items-center justify-center md:justify-end gap-2 px-3">
                    <ReviewLog data={data.reviewLogs} />
                  </div>
                </div>
                <div className="grid lg:grid-cols-2">
                  <div className="flex flex-col md:flex-row gap-2 items-center">
                    <div className="h-32 w-32">
                      <Image className="w-full h-full object-contain" width={100} height={100} src={toUrlAsset(data.logo)} alt={data?.logo} />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex">
                        <div className="w-32">Name</div>
                        <div className='w-3 shrink-0'>:</div>
                        <div className="flex-1">{data.name}</div>
                      </div>
                      <div className="flex">
                        <div className="w-32">Ticker</div>
                        <div className='w-3 shrink-0'>:</div>
                        <div className="flex-1">{data.ticker}</div>
                      </div>
                      <div className="flex">
                        <div className="w-32">Social</div>
                        <div className="w-3">:</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            {data.socials.map((social, index) => (
                              <Link key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                                <Icon name={social.social.icon} />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-32">Chain</div>
                        <div className="w-3">:</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            {data.chains.map((chain, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Image className="w-7 h-7 border rounded-full object-contain" width={30} height={30} src={toUrlAsset(chain.chain.logo)} alt={chain.chain.logo} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex">
                      <div className="w-32">Owner Name</div>
                      <div className='w-3 shrink-0'>:</div>
                      <div className="flex-1">{data.user.fullname}</div>
                    </div>
                    <div className="flex">
                      <div className="w-32">Wallet Address</div>
                      <div className='w-3 shrink-0'>:</div>
                      <div className="flex-1">{data.user.walletAddress ?? "-"}</div>
                    </div>
                    <div className="flex">
                      <div className="w-32">Status</div>
                      <div className='w-3 shrink-0'>:</div>
                      <div className="flex-1">{data.user.verifications.shift()?.status ?? 'Not Verified'}</div>
                    </div>
                  </div>
                </div>
                <div className="my-2 pt-4">
                  <RowItem labelWidth="w-1/3" label="Total Supply" value={data.totalSupply} />
                  <RowItem labelWidth="w-1/3" label="Status" value={data.status} />
                  <RowItem labelWidth="w-1/3" label="Category" value={data.category.name} />
                </div>
              </div>
              <div className="mt-6">
                <h2 className="mb-2 text-lg font-semibold">Presale Info</h2>
                <div>
                  <RowItem labelWidth="w-1/3" label="Hardcap" value={data.presales.hardcap} />
                  <RowItem labelWidth="w-1/3" label="Price" value={`${data.presales.price} ${data.presales.unit}`} />
                  <RowItem labelWidth="w-1/3" label="Max Contribution" value={data.presales.maxContribution} />
                  <RowItem labelWidth="w-1/3" label="End Date" value={`${dayjs(data.presales.duration).format('MMM DD, YYYY HH:MM')}`} />
                </div>
              </div>
              <div className="pt-3 border-t">
                <div className="grid gap-3 lg:grid-cols-2 items-center">
                  <Allocations data={data.allocations} />
                  {
                    data.allocations && <ChartAllocations data={data.allocations} />
                  }
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )
      }
    </>
  )
}
