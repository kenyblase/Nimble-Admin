import React from 'react'
import Input from './Input'
import { ChevronDownCircle, Search } from 'lucide-react'
import { useAuthStore } from '../utils/api/store/useAuthStore'


const Navbar = () => {
  const {admin} = useAuthStore()
  return (
    <div className='h-24 w-full gap-2 flex items-center'>
      <div className='w-full mt-6'>
      <Input
        icon={Search}
        placeholder={'Search here for users, requests, or transactions.'}
        otherStyles={'h-12'}
      />
      </div>
      <div className='flex items-center gap-1 ml-8'>
        <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.219971" y="0.5" width="48" height="48" rx="8" fill="#FAFAFA"/>
        <path d="M24.22 19.8667V22.6417" stroke="#1C1C1C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
        <path d="M24.2367 16.1665C21.17 16.1665 18.6867 18.6498 18.6867 21.7165V23.4665C18.6867 24.0332 18.4533 24.8832 18.1617 25.3665L17.1033 27.1332C16.4533 28.2248 16.9033 29.4415 18.1033 29.8415C22.0867 31.1665 26.395 31.1665 30.3783 29.8415C31.5033 29.4665 31.9867 28.1498 31.3783 27.1332L30.32 25.3665C30.0283 24.8832 29.795 24.0248 29.795 23.4665V21.7165C29.7867 18.6665 27.2867 16.1665 24.2367 16.1665Z" stroke="#1C1C1C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
        <path d="M26.9949 30.1831C26.9949 31.7081 25.7449 32.9581 24.2199 32.9581C23.4616 32.9581 22.7616 32.6414 22.2616 32.1414C21.7616 31.6414 21.4449 30.9414 21.4449 30.1831" stroke="#1C1C1C" stroke-width="1.5" stroke-miterlimit="10"/>
        </svg>

        <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.219971" y="0.5" width="48" height="48" rx="8" fill="#FAFAFA"/>
        <path d="M32.5533 22.8332V25.3332C32.5533 28.6665 30.8866 30.3332 27.5533 30.3332H27.1366C26.8783 30.3332 26.6283 30.4582 26.4699 30.6665L25.2199 32.3332C24.6699 33.0665 23.7699 33.0665 23.2199 32.3332L21.9699 30.6665C21.8366 30.4832 21.5283 30.3332 21.3033 30.3332H20.8866C17.5533 30.3332 15.8866 29.4998 15.8866 25.3332V21.1665C15.8866 17.8332 17.5533 16.1665 20.8866 16.1665H25.8866" stroke="#1C1C1C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M30.4699 20.3332C31.6205 20.3332 32.5533 19.4004 32.5533 18.2498C32.5533 17.0992 31.6205 16.1665 30.4699 16.1665C29.3193 16.1665 28.3866 17.0992 28.3866 18.2498C28.3866 19.4004 29.3193 20.3332 30.4699 20.3332Z" stroke="#1C1C1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M27.5504 23.6667H27.5579" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M24.2162 23.6667H24.2237" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20.8821 23.6667H20.8895" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <div className='flex flex-col mr-2'>
        <p className='text-2xl font-semibold text-[#1A1A1A] whitespace-nowrap'>{admin.fullName ? admin.fullName : 'Admin'}</p>
        <p className='text-base font-semibold text-[#999999] text-right whitespace-nowrap'>{admin.role ? admin.role : 'admin'}</p>
      </div>

      <img src={admin.avatar ? admin.avatar : "idara-logo.png"} alt="admin profile pic" className='h-14 object-cover rounded-full mr-2'/>
      <ChevronDownCircle color='#B0B0B0' className='mr-2 size-8'/>
    </div>
  )
}

export default Navbar