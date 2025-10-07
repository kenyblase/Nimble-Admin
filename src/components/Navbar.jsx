import React from 'react'
import Input from './Input'
import { Bell, ChevronDown, Search } from 'lucide-react'
import { useAuthStore } from '../utils/api/store/useAuthStore'


const Navbar = () => {
  const {admin} = useAuthStore()
  const notificationCount = 100
  return (
    <div className='h-18 w-full gap-2 flex justify-between items-center py-4'>
      <div className='w-80 mt-6'>
      <Input
        icon={Search}
        placeholder={'Search'}
        otherStyles={'h-9'}
      />
      </div>

      <div className='flex items-center gap-6'>
        <div className='relative h-10 w-10 items-center justify-center'>
            <Bell size={24} color="#000" />
            {notificationCount > 0 && (
            <div className='absolute flex items-center justify-center -top-1 right-1 bg-[#D61C2B] rounded-full py-[1px] px-2 max-w-7'>
                <p className='text-[10px] text-white font-semibold'>
                {notificationCount > 99 ? "99+" : notificationCount}
                </p>
            </div>
            )}
        </div>
        

        <img src={admin.avatar ? admin.avatar : "default-avatar.jpeg"} alt="admin profile pic" className='h-14 object-cover rounded-full mr-2'/>

        <div className='flex flex-col mr-2'>
          <p className='text-2xl font-semibold text-[#1A1A1A] whitespace-nowrap'>{admin?.firstName} {admin?.lastName}</p>
          <p className='text-base font-semibold text-[#999999] text-right whitespace-nowrap'>{admin?.role}</p>
        </div>

        <div className='size-4.5 border-[0.2px] border-[#5C5C5C] rounded-full flex items-center justify-center'>
          <ChevronDown color='#565656'/>
        </div>
      </div>

    </div>
  )
}

export default Navbar