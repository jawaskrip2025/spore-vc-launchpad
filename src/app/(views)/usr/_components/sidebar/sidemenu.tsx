'use client'
import { usePathname } from 'next/navigation'
import SidemenuItem from './sidemenu-item'
import { sidemenus } from '@/data/menu'
export default function Sidemenu() {
  const pathname = usePathname()
  return (
    <div className='h-full py-6'>
      {
        sidemenus.map((item, index) => (
          <div className='mt-4' key={index}>
            <h2 className='text-xs text-slate-400 dark:text-slate-500 font-medium'>{item.label}</h2>
            <div>
              {
                item.children.map((menu, index) => (
                  <SidemenuItem
                    key={index}
                    icon={menu.icon}
                    isActive={menu.path === pathname}
                    label={menu.label}
                    path={menu.path}
                  />
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}
