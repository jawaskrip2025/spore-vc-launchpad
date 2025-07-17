'use client'

import { useSidemenu } from "@/store/useSidemenu"
import { Button } from "./ui/button"
import { Icon } from "./icon"

export default function SidemnuToggle() {
  const { setOpen, open } = useSidemenu()
  function toggleMenu() {
    setOpen(!open)
  }
  return (
    <Button  className="md:hidden" size={'icon'} onClick={toggleMenu}>
      {!open ? (
        <Icon name="line-md:close-to-menu-transition" />
      ) : (
        <Icon name="line-md:menu-to-close-transition" />
      )}
    </Button>
  )
}
