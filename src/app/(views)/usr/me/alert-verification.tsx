import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertCircleIcon } from 'lucide-react'
import Link from 'next/link'

export default function AlertVerification({ status }: { status?: "PENDING" | "REJECTED" | "APPROVED" }) {
  return (
    <>
      {
        !status && (
          <Alert variant="destructive" className='bg-red-500/20 text-red-600 border-none'>
            <AlertCircleIcon />
            <AlertTitle>
              <b>Your Account Not Verified!</b>
            </AlertTitle>
            <AlertDescription>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  Please verify your account to create assets.
                </div>
                <Button variant={'default'} size={'sm'} asChild>
                  <Link href={'/usr/verification'}>Verify Now</Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )
      }
      {
        status === 'REJECTED' && (
          <Alert variant="destructive" className='bg-red-500/20 text-red-600 border-none'>
            <AlertCircleIcon />
            <AlertTitle>
              <b>Your Account Not Verified!</b>
            </AlertTitle>
            <AlertDescription>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  Please verify your account to create assets.
                </div>
                <Button variant={'default'} size={'sm'} asChild>
                  <Link href={'/usr/verification'}>Update Document</Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )
      }
    </>
  )
}
