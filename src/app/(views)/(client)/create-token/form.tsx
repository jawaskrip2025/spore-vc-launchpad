'use client'

import { FormInput } from '@/components/form-input'
import { FormSelect } from '@/components/form-select'
import { Icon } from '@/components/icon'
import { ImageDropzone } from '@/components/image-dropzone'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { categories } from '@/data/category'
import { chains } from '@/data/chain'
// import { converToIpfs, pinata } from '@/lib/pinata'
import { TFormToken } from '@/models/token'
import { formTokenSchema } from '@/models/token/schema'
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFieldArray, useForm } from "react-hook-form"

export default function FormToken() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)

  const form = useForm<TFormToken>({
    resolver: zodResolver(formTokenSchema),
    defaultValues: {
      name: "",
      symbol: "",
      category: "",
      chain: "",
      description: "",
      allocations: [
        {
          allocation: "",
          supply: 0,
          vesting: 1,
          start_date:""
        }
      ]
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "allocations"
  })

  const allocations = form.watch("allocations");
  const totalPercent = allocations.reduce((sum, a) => sum + Number(a.supply || 0), 0)

  // async function uploadFile() {
  //   const urlRequest = await fetch("/api/upload");
  //   const urlResponse = await urlRequest.json();
  //   if (!file) {
  //     alert('Upload image please!')
  //     return
  //   }
  //   const upload = await pinata.upload.public
  //     .file(file)
  //     .url(urlResponse.url);
  //   const url = converToIpfs(upload.cid)
  //   return url;
  // }
  async function onSubmit(values: TFormToken) {
    console.log(values)
    // const fileUrl = await uploadFile()
    // const newValues = {
    //   ...values,
    //   file: fileUrl
    // }
    // console.log(newValues)
    // localStorage.setItem("form-1", JSON.stringify(newValues))
  }

  return (
    <div className='max-w-4xl mx-auto py-12 px-3'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-44 h-44 shrink-0 mx-auto md:mx-0">
              <ImageDropzone
                onChange={(file) => setFile(file)}
              />
            </div>
            <div className='flex-1 space-y-4'>
              <FormInput
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter name"
              />
              <FormInput
                control={form.control}
                name="symbol"
                label="Ticker"
                placeholder="Enter ticker"
              />
            </div>
          </div>
          <FormSelect
            control={form.control}
            name="chain"
            label="Select Chain"
            placeholder="select chain"
            groups={chains}
          />
          <FormSelect
            control={form.control}
            name="category"
            label="Select Category"
            placeholder="select category"
            groups={categories}
          />
          <FormInput
            control={form.control}
            name="supply"
            label="Total Supply"
            type='number'
            placeholder="Enter Supply"
          />
          <FormInput
            control={form.control}
            name="description"
            isLongText
            label="Description"
            placeholder="Enter Description"
          />
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Allocations</h3>
            <div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col md:flex-row gap-2 md:items-end space-y-2">
                  <div className="flex-1">
                    <FormInput
                      control={form.control}
                      name={`allocations.${index}.allocation`}
                      label="Allocation"
                      placeholder="e.g. Team"
                    />
                  </div>
                  <div className="flex-1">
                    <FormInput
                      control={form.control}
                      name={`allocations.${index}.supply`}
                      label="Supply (%)"
                      placeholder="e.g. 1000"
                      type="number"
                    />
                  </div>
                  <div className="flex-1">
                    <FormInput
                      control={form.control}
                      name={`allocations.${index}.vesting`}
                      label="Vesting (mo)"
                      placeholder="e.g. 6"
                      type="number"
                    />
                  </div>
                  <div className="flex-1">
                    <FormInput
                      control={form.control}
                      name={`allocations.${index}.start_date`}
                      label="Start Date"
                      placeholder="e.g. 6"
                      type="date"
                    />
                  </div>
                  <Button disabled={index < 1} className='ms-auto' size={"icon"} type="button" variant="destructive" onClick={() => remove(index)}>
                    <Icon name='tabler:trash' />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <p className={`text-xs font-semibold ${totalPercent !== 100 ? 'text-red-500' : 'text-green-600'}`}>
                Total Allocation: {totalPercent}%
              </p>
              {totalPercent !== 100 && <p className='text-xs font-semibold'>Total Allocation Must be 100%</p>}
            </div>
          </div>
          <Button disabled={totalPercent >= 100} type="button" onClick={() => append({ allocation: "", supply: 0, start_date:"", vesting: 0 })}>
            + Allocation
          </Button>
          <div className="flex items-center gap-2 justify-end sticky bottom-0 py-3">
            <Button onClick={() => router.back()} variant={"outline"} size={"lg"} type="button">Cancel</Button>
            <Button disabled={
              totalPercent !== 100
            } size={"lg"} type="submit">Submit</Button>

          </div>
        </form>
      </Form>
    </div>
  )
}
