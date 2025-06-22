'use client'
import { cn } from '@/lib/utils'
import { useWeb3AuthConnect } from '@web3auth/modal/react'
import { Icon } from './icon'
import { Button } from './ui/button'
import { WalletButtonConnected } from './wallet-button-connected'

export default function WalletButton({ withText }: { withText?: boolean }) {
  const {
    connect,
    isConnected,
    loading: connecting,
  } = useWeb3AuthConnect();

  async function handleConnect() {
    await connect()
  }
  return (
    <div>
      <>
        {
          isConnected ? (
            <WalletButtonConnected />
          ) : (
            <>
              <Button disabled={connecting} onClick={handleConnect} className='hidden md:flex'>
                <Icon name='solar:wallet-2-bold' />
                <p>Connect</p>
              </Button>
              <Button disabled={connecting} onClick={handleConnect} size={withText ? "default" : "icon"} className='md:hidden'>
                <Icon name='solar:wallet-2-bold' />
                <p className={cn(
                  withText ? 'block' : 'hidden'
                )}>Connect</p>
              </Button>
            </>
          )
        }
      </>

    </div>
  )
}
