'use client'
import { sidemenus } from '@/data/menu'
import { usePathname } from 'next/navigation'
import SidemenuItem from './sidemenu-item'
// import { useMyProfile } from '@/modules/profile/profile.query'
export default function Sidemenu() {
  const pathname = usePathname()
  // const { data } = useMyProfile()
  return (
    <div className='h-full py-6'>
      {
        sidemenus.map((item, index) => (
          <div className='mt-4' key={index}>
            <h2 className='text-xs text-slate-400 dark:text-slate-500 font-medium'>{item.label}</h2>
            <div>
              {
                item.children.map((menu, index) => (
                  <div className='relative' key={index}>
                    {/* {
                      menu.path === '/usr/me' && (
                        <>
                          {
                            data?.verifications?.find(i => i.status === 'APPROVED') && (
                              <div className='absolute top-3 right-2 bg-red-100 text-red-600 px-2 text-[10px] font-bold rounded-sm'>
                                Not Verified!
                              </div>
                            )
                          }
                        </>
                      )
                    } */}
                    <SidemenuItem
                      icon={menu.icon}
                      isActive={menu.path === pathname}
                      label={menu.label}
                      path={menu.path}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}
