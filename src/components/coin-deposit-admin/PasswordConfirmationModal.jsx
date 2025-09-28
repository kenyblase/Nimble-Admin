import React from 'react'
import BlueGradientButton from '../BlueGradientButton';
import { CircleCheck, Lock, Plus } from 'lucide-react';
import Input from '../Input';
import toast from 'react-hot-toast';

const PasswordConfirmationModal = ({ header, text, icon, buttonText, isLoading, isOpen, onClose, adminData, setAdminData, onSubmit, openAdminModal }) => {
    if (!isOpen) return null;

    const handleClick = async()=>{
      if(!adminData.password) return toast.error('Input password to continue')
      
      await onSubmit()
      onClose()
    }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
            className="absolute inset-0 bg-[#2E2E2E] opacity-70"
            onClick={onClose}
        />

        <div className="relative flex flex-col gap-4 bg-white w-[800px] max-w-full rounded-lg shadow-lg p-10 z-10">
          <div className='flex flex-col gap-8 justify-center items-center'>
            <div className='flex flex-col gap-3 justify-center items-center'>
              {icon}
              <div className='flex flex-col justify-center items-center gap-2'>
                <h3 className='text-3xl font-bold text-[#000000]'>{header}</h3>
                <p className='text-base font-semibold text-[#949494]'>{text}</p>
              </div>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label className='text-base font-semibold text-[#757575]'> Enter Password </label>
                <Input 
                  type='password'
                  icon={Lock}
                  placeholder='Enter Password'
                  otherStyles={'w-full pt-2 pb-2 '}
                  value={adminData.password}
                  onChange={e => setAdminData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
          </div>
          <div className="flex gap-4 w-full">
            <div className="w-full flex items-center">
              <BlueGradientButton
                icon={<CircleCheck color="#EBF2FF"/>}
                text={buttonText}
                otherStyles={'w-full h-full flex items-center'}
                handleClick={handleClick}
                isLoading={isLoading}
              />
            </div>
            <button onClick={()=>{
              onClose()
              openAdminModal()
            }} className={`w-full py-4 rounded-lg cursor-pointer font-semibold text-[#D61C2B]`}>No, Cancel</button>
          </div>
        </div>
    </div>
  )
}

export default PasswordConfirmationModal