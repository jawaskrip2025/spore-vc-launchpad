import { cn } from '@/lib/utils'
import React from 'react'

type RowItemProps = {
  label?: null | string
  value?: null | string
  labelWidth?: string
  children?: React.ReactNode
}
export default function RowItem(props: RowItemProps) {
  return (
    <div className="flex py-2 border-t items-center">
      <div className={cn(
        'shrink-0 text-sm',
        props?.labelWidth ? props?.labelWidth : "w-32"
      )}>{props?.label}</div>
      <div className='w-3 shrink-0'>:</div>
      {
        props.value && <div className="flex-1 text-sm">{props?.value}</div>
      }
      {
        props?.children && <div className="flex-1 text-sm">{props.children}</div>
      }
    </div>
  )
}
