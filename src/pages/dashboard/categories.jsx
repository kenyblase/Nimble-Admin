import React from 'react'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
  const navigate = useNavigate()
  return (
    <div className='mt-[29px]'>
      <div className='h-11 flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-[#202224]'>Categories</h1>
        <button onClick={()=>navigate('/categories/create')} className='flex gap-1 items-center cursor-pointer h-full rounded-full bg-[#3652AD] px-5'>
          <Plus size={18} color='#F6F6F6'/>
          <h1 className='text-lg font-semibold text-[#FEFEFF]'>Create category</h1>
        </button>
      </div>
    </div>
  )
}

export default Categories