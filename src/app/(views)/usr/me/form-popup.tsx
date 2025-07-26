'use client'
import { FormInput } from "@/components/form-input"
import { Icon } from "@/components/icon"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

import { Form } from "@/components/ui/form"
import { useUpdateProfile } from "@/modules/profile/profile.query"
import { formProfileSchema } from "@/modules/profile/profile.schema"
import { TFormProfile } from "@/types/profile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormPopupProp = {
  fieldName: keyof TFormProfile
  fieldValue?: string | null
  id: string
}
export function FormPopup(props: FormPopupProp) {
  const [open, setOpen] = useState(false)
  const { mutate } = useUpdateProfile()
  const form = useForm<TFormProfile>({
    resolver: zodResolver(formProfileSchema),
    defaultValues: {
      [props.fieldName]: props.fieldValue ?? ''
    }
  })
  async function onSubmit(values: TFormProfile) {
    mutate({
      data: values,
    }, {
      onSuccess: () => setOpen(false)
    });
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={'ghost'}>
          <Icon className="text-lg" name="mdi:pencil" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change <span className="capitalize">{props.fieldName}</span></DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="py-3 space-y-3">
              <FormInput
                control={form.control}
                label={(props.fieldName).toUpperCase()}
                name={props.fieldName}
              />
            </div>
            <div className="mt-5 flex justify-end">
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
