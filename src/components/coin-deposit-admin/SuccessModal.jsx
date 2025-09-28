import React from 'react'
import BlueGradientButton from '../BlueGradientButton';
import { ChevronLeftCircle, CircleCheck, Lock, Plus } from 'lucide-react';
import Input from '../Input';
import toast from 'react-hot-toast';

const SuccessModal = ({ header, text, icon, isOpen, onClose}) => {
  if (!isOpen) return null;
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
          </div>
          <div className="flex gap-4 w-full">
            <div className="w-full flex items-center">
              <BlueGradientButton
                icon={<ChevronLeftCircle color="#EBF2FF"/>}
                text='Go back to Admin list'
                otherStyles={'w-full h-full flex items-center'}
                handleClick={onClose}
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default SuccessModal