import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCategory } from '../../utils/useApis/useCategoryApis/useGetCategories'
import { ArrowLeft, Edit } from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useToggleCategoryActiveStatus } from '../../utils/useApis/useCategoryApis/useToggleCategoryActiveStatus'
import ItemTabs from '../../components/ItemTabs'
import { useDeleteCategory } from '../../utils/useApis/useCategoryApis/useDeleteCategory'
import { useQueryClient } from '@tanstack/react-query'

const Category = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [itemsActiveTab, setItemsActiveTab] = useState('Active')

    const {data, isLoading} = useGetCategory(id)
    const {deleteCategory} = useDeleteCategory()
    const {toggleCategoryActiveStatus} = useToggleCategoryActiveStatus()

    const itemsTabs = [
    {label: 'Active', count: 12, bgColor: 'bg-[#DEF9D4]', countColor: 'text-[#348352]'}, 
    {label: 'Review', count: 12, bgColor: 'bg-[#C6C7F880]', countColor: 'text-[#3652AD]'}, 
    {label: 'Closed', count: 12, bgColor: 'bg-[#F9EDD4]', countColor: 'text-[#FF8911]'}, 
    {label: 'Rejected', count: 12, bgColor: 'bg-[#F9D8D4]', countColor: 'text-[#E81008]'}, 
    {label: 'Expired', count: 12, bgColor: 'bg-[#F9D8D4]', countColor: 'text-[#E81008]'},
  ]

    if(isLoading) return <LoadingSpinner/>
  return (
    <div className='mt-7 mb-5 flex flex-col gap-7'>
        <div className='flex flex-col gap-6'>
            <div className='flex justify-between items-start'>
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
                <div className='flex gap-6'>
                    <div  
                        onClick={() =>{ 
                              queryClient.setQueryData(["category", id], { data: data.category });
                              navigate(`/categories/${id}/edit`)
                        }}
                        className='bg-[#D3E4FE4D] size-11 border border-[#3652AD] rounded-full flex items-center justify-center cursor-pointer'>
                        <Edit color='#3652AD' size={20}/>
                    </div>
                    <div onClick={async()=>{
                        await deleteCategory(id)
                        navigate('/categories')
                        }} className='h-11 border border-[#B91C1C] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                        <p className='text-[#B91C1C] font-semibold text-base'>Delete</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-20'>
                <div className='flex flex-col gap-1.5 border-r-2 border-[#0000004D] pr-20'>
                    <p className='text-base text-[#202224] font-light'>Parent:</p>
                    {data?.category?.parentCategory
                    ? <p onClick={()=>navigate(`/categories/${data?.category?.parentCategory?._id}`)} className='text-[#202224CC] font-medium text-base cursor-pointer'>{data?.category?.parentCategory?.name}</p> 
                    : <p>N/A</p>
                    }
                </div>
                <div className='flex flex-col gap-1.5'>
                    <p className='text-base text-[#202224] font-light'>Total Listings:</p> 
                    <p className='text-[#202224CC] font-medium text-base cursor-pointer'>{data?.totalProducts}</p>
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-4'>
            <h1 className='text-[#202224] text-3xl font-bold'>Listing</h1>

            <div className='flex flex-col pb-10'>
                <ItemTabs ItemsTabs={itemsTabs} itemsActiveTab={itemsActiveTab} setItemsActiveTab={setItemsActiveTab}/>

            </div>
        </div>
    </div>
  )
}

export default Category