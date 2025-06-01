import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger
} from "@/components/ui/sheet"
import { navmenus } from "@/data/menu"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Icon } from "@/components/icon"
import MainLogo from "@/components/logo"
import WalletButton from "@/components/wallet-button"

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"link"} className="md:hidden" size={'icon'}>
          <Icon className="text-3xl" name="eva:menu-2-outline" />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <div className="mb-12 -mt-2">
          <MainLogo />
        </div>
        <div className="mb-6 ">
          <div className="space-y-6">
            {
              navmenus.map((item, index) => (
                <SheetClose asChild key={index}>
                  <Link href={item.path} className='flex items-center gap-2'>
                    <Icon name={item.icon} />
                    <p>{item.label}</p>
                  </Link>
                </SheetClose>
              ))
            }
          </div>
          <div className="mt-6 pt-6 border-t">
            <div className="flex gap-3 items-center justify-center">
              <Link href={'/'}>
                <Icon className="text-2xl" name="ic:baseline-discord" />
              </Link>
              <Link href={'/'}>
                <Icon className="text-2xl" name="ri:twitter-x-line" />
              </Link>
              <Link href={'/'}>
                <Icon className="text-2xl" name="icon-park:telegram" />
              </Link>
            </div>
          </div>
        </div>
        <SheetFooter>
          <div className="flex items-center justify-center gap-3">
            <SheetClose asChild>
              <WalletButton withText />
            </SheetClose>
            <SheetClose asChild>
              <ModeToggle />
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
