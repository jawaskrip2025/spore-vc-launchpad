import { create } from 'zustand'

type TSidemenuStore = {
  open: boolean
  setOpen: (open:boolean) => void
}

export const useSidemenu = create<TSidemenuStore>()((set) => ({
  open: false,
  setOpen: (open) => set(() => ({ open })),
}))