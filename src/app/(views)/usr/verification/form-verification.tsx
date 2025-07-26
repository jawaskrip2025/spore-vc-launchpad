'use client'

import { ImageDropzone } from "@/components/image-dropzone"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUploadFile } from "@/modules/files/file.query"
import { useMyProfile } from "@/modules/profile/profile.query"
import { useCreateMemberVerification, useRevisionMemberVerification } from "@/modules/verification/verification.query"
import { formMemberVerificationSchema } from "@/modules/verification/verification.schema"
import { TFormMemberVerification } from "@/types/profile"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChangeEvent } from "react"
import { FieldErrors, useForm } from "react-hook-form"
import { toast } from "sonner"
import FormVerificationLoading from "./form-verification-loading"

export default function FormVerification() {
  const { data, isLoading } = useMyProfile()
  const router = useRouter()
  const { mutate } = useUploadFile()
  const { mutate: createVerification } = useCreateMemberVerification()
  const { mutate: updateVerification } = useRevisionMemberVerification()
  const form = useForm<TFormMemberVerification>({
    resolver: zodResolver(formMemberVerificationSchema(data?.vRequirement ?? undefined)),
    defaultValues: {
      bisnisLicense: '',
      idCard: '',
      selfie: '',
      taxId: ''
    }
  })
  async function onSubmit(values: TFormMemberVerification) {
    if (data)
      if (data.verifications?.length) {
        updateVerification({
          data: {
            ...values,
            userId: data.id
          }
        })
      } else {
        createVerification({
          data: {
            ...values,
            userId: data.id
          }
        })

      }
  }
  function handleUploadSelfie(file: File | null) {
    if (file) {
      mutate(file, {
        onSuccess: (res) => form.setValue('selfie', res.path)
      })
    }
  }
  function handleUploadIdCard(file: File | null) {
    if (file) {
      mutate(file, {
        onSuccess: (res) => form.setValue('idCard', res.path)
      })
    }
  }
  function handleUploadBL(file: File | null) {
    if (file) {
      mutate(file, {
        onSuccess: (res) => form.setValue('bisnisLicense', res.path)
      })
    }
  }
  function handleUploadCardTaxId(file: File | null) {
    if (file) {
      mutate(file, {
        onSuccess: (res) => form.setValue('taxId', res.path)
      })
    }
  }
  function onInvalid(errors: FieldErrors<TFormMemberVerification>) {
    const messages = Object.values(errors)
      .map((err) => err?.message)
      .filter((msg): msg is string => typeof msg === 'string')

    if (messages.length > 0) {
      toast.error('Validation Error', {
        description: messages.join(", "),
        position: 'top-right'
      })
    }
  }
  return (
    <>
      {!isLoading && data ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
            <div className="space-y-6 max-w-4xl mx-auto bg-white p-5 rounded-lg">
              <div>
                <h2 className="text-center font-semibold">Form Verification Document</h2>
              </div>
              {
                data.vRequirement?.SelfieRequired && (
                  <div className="grid md:grid-cols-2 max-w-xl gap-4 mx-auto">
                    <div>
                      <h2 className="text-center mb-2">Selfie Image</h2>
                      <ImageDropzone
                        text="Upload Selfie Image"
                        className='aspect-[3/4] shadow-sm'
                        onChange={(file) => handleUploadSelfie(file)}
                      />
                    </div>
                    <div>
                      <h2 className="text-center mb-2">Sample</h2>
                      <div className="aspect-[3/4] shadow-sm relative rounded-sm overflow-hidden border border-dashed">
                        <Image
                          className='w-full h-full object-cover'
                          width={300}
                          height={400}
                          alt="selfie"
                          src={'/images/selfie.png'}
                        />
                      </div>
                    </div>
                  </div>
                )
              }
              {
                data.vRequirement?.IDCardRequired && (
                  <div className="grid md:grid-cols-2 gap-4 mx-auto">
                    <div>
                      <h2 className="text-center mb-2">ID Card Image</h2>
                      <ImageDropzone
                        text="Upload Selfie Image"
                        className='aspect-[8/5] shadow-sm'
                        onChange={(file) => handleUploadIdCard(file)}
                      />
                    </div>
                    <div>
                      <h2 className="text-center mb-2">Sample</h2>
                      <div className="aspect-[8/5] shadow-sm relative rounded-sm overflow-hidden border border-dashed">
                        <Image
                          className='w-full h-full object-cover'
                          width={300}
                          height={400}
                          alt="selfie"
                          src={'/images/idcard.png'}
                        />
                      </div>
                    </div>
                  </div>
                )
              }
              {
                data.vRequirement?.BussinessLicenseRequired && (
                  <div>
                    <h2 className="mb-2">Bussines Lisence</h2>
                    <Input
                      type="file"
                      onChange={(file: ChangeEvent<HTMLInputElement>) => handleUploadBL(file.target.files ? file.target.files[0] : null)}
                    />
                  </div>
                )
              }
              {
                data.vRequirement?.TaxIdRequired && (
                  <div className="grid md:grid-cols-2 gap-4 mx-auto">
                    <div>
                      <h2 className="text-center mb-2">Card TaxID</h2>
                      <ImageDropzone
                        text="Upload Selfie Image"
                        className='aspect-[8/5] shadow-sm'
                        onChange={(file) => handleUploadCardTaxId(file)}
                      />
                    </div>
                    <div>
                      <h2 className="text-center mb-2">Sample</h2>
                      <div className="aspect-[8/5] shadow-sm relative rounded-sm overflow-hidden border border-dashed">
                        <Image
                          className='w-full h-full object-cover'
                          width={300}
                          height={400}
                          alt="selfie"
                          src={'/images/taxid.png'}
                        />
                      </div>
                    </div>
                  </div>
                )
              }
              <div className="sticky bottom-3 flex justify-end gap-4">
                <Button variant={'outline'} onClick={() => router.back()}>Cancel</Button>
                <Button type="submit">Submit Verification</Button>
              </div>
            </div>
          </form>
        </Form>
      ) : (
          <FormVerificationLoading />
      )}
    </>
  )
}
