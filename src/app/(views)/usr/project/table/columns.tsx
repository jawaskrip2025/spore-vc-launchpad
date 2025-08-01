'use client'
import { Icon } from "@/components/icon";
import ImagePopover from "@/components/image-popover";
import { Button } from "@/components/ui/button";
import { toUrlAsset } from "@/lib/utils";
import { TProject } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { FormDeploy } from "../form-deploy";
export const columns: ColumnDef<TProject>[] = [
  {
    accessorKey: 'chain',
    header: 'Chain',
    cell: ({ row }) => {
      return (
        <div>{row.original.chains.map((i, index) => (
          <div key={index} className="flex gap-1 items-center">
            <Image alt="chain" width={20} height={20} src={toUrlAsset(i.chain.logo)} />
            <div className="text-sm">{i.chain.name}</div>
          </div>
        ))}</div>
      )
    }
  },
  {
    accessorKey: 'logo',
    header: 'Logo',
    cell: ({ row }) => {
      return (
        <ImagePopover className="border h-8 w-8" src={toUrlAsset(row.original.logo)} />
      )
    }
  },
  {
    accessorKey: 'banner',
    header: 'Banner',
    cell: ({ row }) => {
      return (
        <ImagePopover className="border h-8 w-8" src={toUrlAsset(row.original.banner)} />
      )
    }
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      return (
        <div>{row.original.category.name}</div>
      )
    }
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'ticker',
    header: 'Ticker',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <Button asChild variant={'outline'} size={"icon"}>
            <Link href={`/usr/project/${row.original.id}/edit`}>
              <Icon className="text-sm" name="akar-icons:pencil" />
            </Link>
          </Button>
          <Button asChild size={"icon"} variant={'outline'}>
            <Link href={`/usr/project/${row.original.id}`}>
              <Icon className="text-lg" name="entypo:info" />
            </Link>
          </Button>
          <FormDeploy status={row.original.status} />
        </div>
      )
    }
  }
]

