import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCategory } from '../../utils/useApis/useCategoryApis/useGetCategories'
import { ArrowLeft } from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useToggleCategoryActiveStatus } from '../../utils/useApis/useCategoryApis/useToggleCategoryActiveStatus'

const Category = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const {data, isLoading} = useGetCategory(id)
    const {toggleCategoryActiveStatus, isToggling} = useToggleCategoryActiveStatus()

    if(isLoading) return <LoadingSpinner/>
  return (
    <div className='mt-7 mb-5 flex flex-col gap-7'>
        <div className='flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-2 items-center'>
                        <ArrowLeft onClick={()=>{navigate(-1)}} color='#FE7A36' size={32}/>
                        <p className='text-3xl font-bold text-[#202224]'>{data?.category?.name}</p>
                    </div>
                    <div className='flex gap-6'>
                        {data?.category?.isActive ? <p className='text-[#0DBA37] text-base font-300'>Active</p> : <p className='text-black text-base font-300'>Inactive</p>}

                         <label className="relative inline-flex items-center cursor-pointer">
                            <input
                            type="checkbox"
                            checked={data?.category?.isActive}
                            onChange={()=>toggleCategoryActiveStatus(id)}
                            className="sr-only peer"
                            />
                            <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-[#0DBA37] transition-all duration-300"></div>
                            <div className="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow-md"></div>
                        </label>
                    </div>
                </div>
                <div></div>
            </div>
            <div></div>
        </div>
        <div></div>
    </div>
  )
}

export default Category