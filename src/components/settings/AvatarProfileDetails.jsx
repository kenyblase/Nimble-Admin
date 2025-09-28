import { useState } from 'react';
import {useAuthStore} from '../../utils/api/store/useAuthStore'
import AvatarUploadModal from './AvatarUploadModal'

const AvatarProfileDetails = () => {
  const {admin} = useAuthStore()
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className='flex gap-5'>
      <div>
        {admin.avatar ? (
          <img src={admin.avatar} alt="avatar" className='w-62.5 h-62.5 object-cover rounded-lg'/>
        ) : (
          icons.avatar
        )}
      </div>
      <div className='flex justify-between w-full'>

        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-3'>
            <div className='bg-[#FFF2EB] flex items-center gap-2 py-1 px-2 rounded-lg w-max'>
              <p className='text-[#2E2E2E] font-semibold text-base'>{admin.role}</p>
              {handleAdminRoleIcon(admin.role)}
            </div>
            <p className='text-5xl font-bold text-[#2E2E2E]'>{admin.fullName ? admin.fullName : '-'}</p>
            <p className='text-lg font-semibold text-[#949494]'>{`Admin ID: ADMIN-${admin._id ? admin._id : '-'}`}</p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='font-semibold text-xl text-[#666666]'>Bio Data:</p>
            <div className='flex gap-8'>
              <div className='flex flex-col gap-1'>
                <p className='font-medium text-sm text-[#BFBFBF]'>Gender</p>
                <p className='font-semibold text-base text-[#2E2E2E]'>{admin.gender ? admin.gender : '-'}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='font-medium text-sm text-[#BFBFBF]'>Age:</p>
                <p className='font-semibold text-base text-[#2E2E2E]'>{admin.dateOfBirth ? <span>{`${formatDate(admin.dateOfBirth)} (${calculateAge(admin.dateOfBirth)} years old)`}</span> : '-'}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='font-medium text-sm text-[#BFBFBF]'>Email Address:</p>
                <p className='font-semibold text-base text-[#2E2E2E]'>{admin.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-end justify-end'>
          <button onClick={()=>setModalOpen(true)} className='flex gap-2.5 border-2 border-[#0057FF] rounded-lg py-3 px-5'>
            {icons.camera}
            <span className='text-[#0057FF] font-semibold text-base'>Change profile photo</span>
          </button>
        </div>
      </div>

      <AvatarUploadModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}/>
    </div>
  )
}

export default AvatarProfileDetails

function formatDate(isoString) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function calculateAge(isoString) {
  const dob = new Date(isoString);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}

const handleAdminRoleIcon = (adminRole)=>{
  if(adminRole === 'Super Admin') return (
    <span>{icons.superAdmin}</span>
  )
  else if(adminRole === 'Moderator') return (
    <span>{icons.moderator}</span>
  )
  else return (
    <span>{icons.support}</span>
  )
}

const icons = {
  avatar: <svg width="250" height="251" viewBox="0 0 250 251" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.75" width="249" height="249" rx="7.5" fill="#FAFAFA"/>
          <rect x="0.5" y="0.75" width="249" height="249" rx="7.5" stroke="#BFBFBF"/>
          <path d="M125 125.25C136.046 125.25 145 116.296 145 105.25C145 94.2043 136.046 85.25 125 85.25C113.954 85.25 105 94.2043 105 105.25C105 116.296 113.954 125.25 125 125.25Z" fill="#BFBFBF"/>
          <path d="M125 135.25C104.96 135.25 88.6399 148.69 88.6399 165.25C88.6399 166.37 89.5199 167.25 90.6399 167.25H159.36C160.48 167.25 161.36 166.37 161.36 165.25C161.36 148.69 145.04 135.25 125 135.25Z" fill="#BFBFBF"/>
          </svg>,

  superAdmin: <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.9666 9.44948L16.8333 8.13281C16.6166 7.88281 16.4416 7.41615 16.4416 7.08281V5.66615C16.4416 4.78281 15.7166 4.05781 14.8333 4.05781H13.4166C13.0916 4.05781 12.6166 3.88281 12.3666 3.66615L11.0499 2.53281C10.4749 2.04115 9.53328 2.04115 8.94994 2.53281L7.64161 3.67448C7.39161 3.88281 6.91661 4.05781 6.59161 4.05781H5.14994C4.26661 4.05781 3.54161 4.78281 3.54161 5.66615V7.09115C3.54161 7.41615 3.36661 7.88281 3.15828 8.13281L2.03328 9.45781C1.54994 10.0328 1.54994 10.9661 2.03328 11.5411L3.15828 12.8661C3.36661 13.1161 3.54161 13.5828 3.54161 13.9078V15.3328C3.54161 16.2161 4.26661 16.9411 5.14994 16.9411H6.59161C6.91661 16.9411 7.39161 17.1161 7.64161 17.3328L8.95828 18.4661C9.53328 18.9578 10.4749 18.9578 11.0583 18.4661L12.3749 17.3328C12.6249 17.1161 13.0916 16.9411 13.4249 16.9411H14.8416C15.7249 16.9411 16.4499 16.2161 16.4499 15.3328V13.9161C16.4499 13.5911 16.6249 13.1161 16.8416 12.8661L17.9749 11.5495C18.4583 10.9745 18.4583 10.0245 17.9666 9.44948ZM13.4666 8.92448L9.44161 12.9495C9.32494 13.0661 9.16661 13.1328 8.99994 13.1328C8.83328 13.1328 8.67494 13.0661 8.55828 12.9495L6.54161 10.9328C6.29994 10.6911 6.29994 10.2911 6.54161 10.0495C6.78328 9.80781 7.18328 9.80781 7.42494 10.0495L8.99994 11.6245L12.5833 8.04115C12.8249 7.79948 13.2249 7.79948 13.4666 8.04115C13.7083 8.28281 13.7083 8.68281 13.4666 8.92448Z" fill="url(#paint0_linear_123_45961)"/>
            <defs>
            <linearGradient id="paint0_linear_123_45961" x1="10.0036" y1="2.16406" x2="10.0036" y2="18.8349" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF9358"/>
            <stop offset="1" stop-color="#FFE418"/>
            </linearGradient>
            </defs>
            </svg>,
  
  moderator: <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.9666 9.44948L16.8333 8.13281C16.6166 7.88281 16.4416 7.41615 16.4416 7.08281V5.66615C16.4416 4.78281 15.7166 4.05781 14.8333 4.05781H13.4166C13.0916 4.05781 12.6166 3.88281 12.3666 3.66615L11.0499 2.53281C10.4749 2.04115 9.53328 2.04115 8.94994 2.53281L7.64161 3.67448C7.39161 3.88281 6.91661 4.05781 6.59161 4.05781H5.14994C4.26661 4.05781 3.54161 4.78281 3.54161 5.66615V7.09115C3.54161 7.41615 3.36661 7.88281 3.15828 8.13281L2.03328 9.45781C1.54994 10.0328 1.54994 10.9661 2.03328 11.5411L3.15828 12.8661C3.36661 13.1161 3.54161 13.5828 3.54161 13.9078V15.3328C3.54161 16.2161 4.26661 16.9411 5.14994 16.9411H6.59161C6.91661 16.9411 7.39161 17.1161 7.64161 17.3328L8.95828 18.4661C9.53328 18.9578 10.4749 18.9578 11.0583 18.4661L12.3749 17.3328C12.6249 17.1161 13.0916 16.9411 13.4249 16.9411H14.8416C15.7249 16.9411 16.4499 16.2161 16.4499 15.3328V13.9161C16.4499 13.5911 16.6249 13.1161 16.8416 12.8661L17.9749 11.5495C18.4583 10.9745 18.4583 10.0245 17.9666 9.44948ZM13.8999 10.4995L12.9249 13.4661C12.7999 13.9578 12.2749 14.3578 11.7416 14.3578H10.1999C9.93328 14.3578 9.55828 14.2661 9.39161 14.0995L8.16661 13.1411C8.14161 13.6745 7.89994 13.8995 7.30828 13.8995H6.90828C6.29161 13.8995 6.04161 13.6578 6.04161 13.0745V9.09115C6.04161 8.50781 6.29161 8.26615 6.90828 8.26615H7.31661C7.93328 8.26615 8.18328 8.50781 8.18328 9.09115V9.39115L9.79994 6.99115C9.96661 6.73281 10.3916 6.54948 10.7499 6.69115C11.1416 6.82448 11.3916 7.25781 11.3083 7.64115L11.1083 8.94115C11.0916 9.05781 11.1166 9.16615 11.1916 9.24948C11.2583 9.32448 11.3583 9.37448 11.4666 9.37448H13.0916C13.4083 9.37448 13.6749 9.49948 13.8333 9.72448C13.9749 9.94115 13.9999 10.2161 13.8999 10.4995Z" fill="#0057FF"/>
              </svg>,

  support: <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 2.16797H5C3.61667 2.16797 2.5 3.2763 2.5 4.64297V13.7346C2.5 15.1013 3.61667 16.2096 5 16.2096H5.63333C6.3 16.2096 6.93333 16.468 7.4 16.9346L8.825 18.343C9.475 18.9846 10.5333 18.9846 11.1833 18.343L12.6083 16.9346C13.075 16.468 13.7167 16.2096 14.375 16.2096H15C16.3833 16.2096 17.5 15.1013 17.5 13.7346V4.64297C17.5 3.2763 16.3833 2.16797 15 2.16797ZM10.2333 12.968C10.1083 13.0096 9.9 13.0096 9.76667 12.968C8.68333 12.593 6.25 11.0513 6.25 8.4263C6.25833 7.26797 7.18333 6.33464 8.33333 6.33464C9.01667 6.33464 9.61667 6.65964 10 7.16797C10.3833 6.65964 10.9833 6.33464 11.6667 6.33464C12.8167 6.33464 13.75 7.26797 13.75 8.4263C13.7417 11.0513 11.3167 12.593 10.2333 12.968Z" fill="#2AC472"/>
          </svg>,
  camera: <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.76005 22.25H17.24C20 22.25 21.1 20.56 21.23 18.5L21.75 10.24C21.89 8.08 20.17 6.25 18 6.25C17.39 6.25 16.83 5.9 16.55 5.36L15.83 3.91C15.37 3 14.17 2.25 13.15 2.25H10.86C9.83005 2.25 8.63005 3 8.17005 3.91L7.45005 5.36C7.17005 5.9 6.61005 6.25 6.00005 6.25C3.83005 6.25 2.11005 8.08 2.25005 10.24L2.77005 18.5C2.89005 20.56 4.00005 22.25 6.76005 22.25Z" stroke="#0057FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 8.25H13.5" stroke="#0057FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 18.25C13.79 18.25 15.25 16.79 15.25 15C15.25 13.21 13.79 11.75 12 11.75C10.21 11.75 8.75 13.21 8.75 15C8.75 16.79 10.21 18.25 12 18.25Z" stroke="#1C1C1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

}