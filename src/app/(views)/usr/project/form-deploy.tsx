'use client'
// import { FormSelect } from "@/components/form-select"
import { Icon } from "@/components/icon"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useState } from "react"
// import { Form } from "@/components/ui/form"
// import { useUpdateSearchParams } from "@/lib/param"
// import { formFilterProjectSchema } from "@/modules/project/project.schema"
// import { TFormFilterProject } from "@/types/project"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"

export function FormDeploy({ status }: { status: string }) {
  const [isDeploying, setIsDeploying] = useState(false)
  // const updateParams = useUpdateSearchParams()
  // const form = useForm<TFormFilterProject>({
  //   resolver: zodResolver(formFilterProjectSchema),
  //   defaultValues: {
  //     status: 'PENDING'
  //   }
  // })
  // async function onSubmit(values: TFormFilterProject) {
  //   updateParams({ status: values.status || '', page: 1 })
  // }
  function handleDeploy() {
    setTimeout(() => {
      setIsDeploying(true)
      
    }, 500);
  }
  return (
    <Dialog onOpenChange={() => setIsDeploying(false)}>
      <DialogTrigger asChild>
        <Button disabled={status !== 'APPROVED'} size={"sm"}>
          <Icon className="text-lg" name="mage:box-3d-upload" /> Deploy
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Publish Project To Blockchain</DialogTitle>
        </DialogHeader>
        <div>
          <div>Waiting For SC</div>
          <div className="py-6 space-y-3">
            {
              isDeploying ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Icon className="text-lg" name="material-symbols:check-rounded" />
                  <div className="text-xs font-medium">Lorem, ipsum dolor. Lorem, ipsum.</div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Icon className={cn(
                    "text-sm",
                    isDeploying && 'animate-spin'
                  )} name="ci:arrow-reload-02" />
                  <div className="text-xs font-medium">Lorem, ipsum dolor, ipsum.</div>
                </div>
              )
            }
            <div className="flex items-center gap-2">
              <Icon className={cn(
                "text-sm",
                isDeploying && 'animate-spin'
              )} name="ci:arrow-reload-02" />
              <div className="text-xs font-medium">Lorem, ipsum dolor. lorem</div>
            </div>
            <div className="flex items-center gap-2">
              <Icon className={cn(
                "text-sm",
                isDeploying && 'animate-spin'
              )} name="ci:arrow-reload-02" />
              <div className="text-xs font-medium">Lorem, ipsum dolor. Lorem, ipsum.</div>
            </div>
            <div className="flex items-center gap-2">
              <Icon className={cn(
                "text-sm",
                isDeploying && 'animate-spin'
              )} name="ci:arrow-reload-02" />
              <div className="text-xs font-medium">Lorem, ipsum dolor. Lorem, ipsum.</div>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <Button disabled={isDeploying} onClick={handleDeploy} type="submit">
              {isDeploying ? 'Processing...' :'Deploy Now!'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
