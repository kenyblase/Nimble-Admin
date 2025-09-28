import { User, Mail, Calendar1Icon } from 'lucide-react'
import Input from '../Input'
import { useAuthStore } from '../../utils/api/store/useAuthStore'
import LogoutButton from './LogoutButton'
import { useLogout } from '../../utils/useApis/useAuthApis/useLogout'

const BioInformation = () => {
  const {admin} = useAuthStore()
  const logout = useLogout()
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-4 w-full'>
        <h1 className='font-semibold text-2xl text-[#2E2E2E]'>Bio Information</h1>
        <div className='flex flex-col'>
          <div className='flex flex-col'>
            <label className='text-base font-semibold text-[#757575]'> Full Name </label>
            <Input 
              type='text'
              placeholder={admin.fullName ? admin.fullName : '-'}
              icon={User}
              otherStyles={'w-full pt-4 pb-4 '}
              readOnly
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-base font-semibold text-[#757575]'> Email Address </label>
            <Input 
              type='text'
              placeholder={admin.email ? admin.email : '-'}
              icon={Mail}
              otherStyles={'w-full pt-4 pb-4 '}
              readOnly
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-base font-semibold text-[#757575]'> Date of Birth </label>
            <Input 
              type='text'
              placeholder={admin.dateOfBirth ? formatDate(admin.dateOfBirth) : '-'}
              icon={Calendar1Icon}
              otherStyles={'w-full pt-4 pb-4 '}
              readOnly
            />
          </div>
        </div>
      </div>
      <LogoutButton logout={logout}/>

    </div>
  )
}

export default BioInformation

function formatDate(isoString) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}