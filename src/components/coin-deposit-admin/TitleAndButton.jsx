import { CirclePlus } from 'lucide-react'
import AddAdminModal from './AddAdminModal';
import { useState } from 'react';
import PasswordConfirmationModal from './PasswordConfirmationModal';
import SuccessModal from './SuccessModal';
import { useRegisterAdmin } from '../../utils/useApis/useAuthApis/useRegisterAdmin';

const TitleAndButton = () => {
  const [isAddAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSucessModalOpen, setIsSuccessModalOpen] = useState(false);
  const {registerAdmin, isregistering} = useRegisterAdmin()
  const [adminData, setAdminData] = useState({
    email: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    role: '',
    allowAllAccess: false,
    permissions: [],
    password: '',
  });

  const handleSubmit = async()=>{
    await registerAdmin(adminData)
    setAdminData({
      email: '',
      fullName: '',
      dateOfBirth: '',
      gender: '',
      role: '',
      allowAllAccess: false,
      permissions: [],
      password: '',
    })
    setIsPasswordModalOpen(false)
    setIsSuccessModalOpen(true)
  }
  return (
    <div className='flex justify-between items-center'>
        <span className='font-bold text-3xl text-[#2E2E2E]'>Admin Levels</span>
        <div className='border border-[#0057FF] rounded-lg'>
        <button onClick={()=>setAddAdminModalOpen(true)} className='flex items-center gap-4 px-4 py-3'>
          <CirclePlus className='size-6' color='#0057FF'/>
          <span className='font-semibold text-lg text-[#0057FF]'>Add New Admin</span>
        </button>
        </div>

        <AddAdminModal isOpen={isAddAdminModalOpen} onClose={() => setAddAdminModalOpen(false)} adminData={adminData}
        setAdminData={setAdminData}
        openPasswordModal={() => setIsPasswordModalOpen(true)}/>

        <PasswordConfirmationModal 
        header='Add Admin'
        text='Enter your password to save changes.'
        buttonText='Yes, Add Admin'
        icon={icons.user}
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        adminData={adminData}
        setAdminData={setAdminData}
        openAdminModal={() => setAddAdminModalOpen(true)}
        isLoading={isregistering}
        onSubmit={handleSubmit}/>

        <SuccessModal
          isOpen={isSucessModalOpen}
          onClose={()=>setIsSuccessModalOpen(false)}
          icon={icons.check}
          header='Admin Added Successfuly'
          text='You have successfully add a new admin to your team'
        />
    </div>
  )
}

export default TitleAndButton

const icons = {
check: <svg width="80" height="81" viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.5" width="80" height="80" rx="40" fill="#F6FDF9"/>
<path d="M40 20.5C28.98 20.5 20 29.48 20 40.5C20 51.52 28.98 60.5 40 60.5C51.02 60.5 60 51.52 60 40.5C60 29.48 51.02 20.5 40 20.5ZM49.56 35.9L38.22 47.24C37.94 47.52 37.56 47.68 37.16 47.68C36.76 47.68 36.38 47.52 36.1 47.24L30.44 41.58C29.86 41 29.86 40.04 30.44 39.46C31.02 38.88 31.98 38.88 32.56 39.46L37.16 44.06L47.44 33.78C48.02 33.2 48.98 33.2 49.56 33.78C50.14 34.36 50.14 35.3 49.56 35.9Z" fill="#2AC472"/>
</svg>

}