import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, LocationEdit } from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useQueryClient } from '@tanstack/react-query'
import { useToggleUserStatus } from '../../utils/useApis/useUserApis/useToggleUserStatus'
import { useFetchListing } from '../../utils/useApis/useListingAPis/useFetchListings'
import { useToggleProductStatus } from '../../utils/useApis/useListingAPis/useToggleProductStatus'

const Listing = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {data, isLoading} = useFetchListing(id)

    const {toggleProductStatus, isToggling} = useToggleProductStatus()

    if(isLoading) return <LoadingSpinner/>
  return (
    <div className='mt-7 mb-5 flex flex-col gap-7'>
        <div className='flex flex-col gap-6'>
            <div className='flex justify-between items-start'>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-2 items-center'>
                        <ArrowLeft onClick={()=>{navigate(-1)}} color='#FE7A36' size={32}/>
                        <p className='text-3xl font-bold text-[#202224]'>{data?.name}</p>
                    </div>
                </div>
                <div className='flex gap-6'>
                    {data?.status === 'pending' || data?.status === 'rejected' ? 
                        <>
                            {data?.status !== 'rejected' &&
                                <button onClick={async()=>{
                                    await toggleProductStatus(id, 'rejected')
                                    }} 
                                    disabled={isToggling}
                                    className='h-11 border border-[#B91C1C] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                                    <p className='text-[#B91C1C] font-semibold text-base'>Reject {data?.type}</p>
                                </button>
                            }
                            <button onClick={async()=>{
                                await toggleProductStatus(id, 'active')
                                }} 
                                disabled={isToggling}
                                className='h-11 bg-[#489766] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                                <p className='text-[#FEFEFF] font-semibold text-base'>Approve {data?.type}</p>
                            </button>
                        </> 
                        :
                        <>
                            {/* <button onClick={async()=>{
                                
                                }} 
                                className='h-11 border border-[#B91C1C] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                                <p className='text-[#B91C1C] font-semibold text-base'>Remove {data?.type}</p>
                            </button> */}
                            <button onClick={async()=>{
                                await toggleProductStatus(id, 'closed')
                                }} 
                                className='h-11 bg-[#489766] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                                <p className='text-[#FEFEFF] font-semibold text-base'>Mark as {data?.status === 'closed' ? 'Active' : 'Closed'}</p>
                            </button>
                        </>

                    }
                </div>
            </div>
        </div>
        <div className='flex items-center gap-10 rounded-lg bg-[#FFFFFF] border border-[#0000000D] py-6 px-4'>
          <div className='flex flex-col gap-3 pr-8'>
            <p className='font-medium text-base text-[#202224]'>Listed On</p>
            <p className='font-medium text-base text-[#202224CC]'>{data?.listedOn || 'Not Listed Yet'}</p>
          </div>
          <div className='flex flex-col gap-3 pr-8'>
            <p className='font-medium text-base text-[#202224]'>{data?.type === 'listing' ? 'Seller' : 'Buyer'}</p>
            <p className='font-medium text-base text-[#202224CC]'>{data?.vendor?.firstName} {data?.vendor?.lastName}</p>
          </div>
          <div className='flex flex-col gap-3 pr-8'>
            <p className='font-medium text-base text-[#202224]'>Status</p>
            <p className='font-medium text-base text-[#202224CC]'>{handleStatus(data?.status)}</p>
          </div>
        </div>

        <div className='flex gap-7 w-full'>
          
        </div>
        
        <div className='flex items-center gap-7 w-full'>
          <div className='flex flex-col gap-2 bg-[#FFFFFF] rounded-lg p-4 w-full'>
            <p className='text-base font-medium text-[#000000CC]'>Description</p>
            <p className='text-base font-light text-[#000000CC]'>{data?.description}</p>
          </div>
          <div className='flex flex-col gap-2 bg-[#FFFFFF] rounded-lg p-4 w-full'>
            <p className='text-base font-medium text-[#000000CC]'>Store Address</p>
            <div className='flex flex-col gap-1'>
              <div className='flex gap-1 items-center'>
                <LocationEdit size={14} color='#000000CC'/>
                <p className='text-base font-extralight text-[#000000CC]'>{data?.shippingAddress?.city || 'N/A'}, {data?.shippingAddress?.state || 'N/A'}</p>
              </div>
              <p className='text-base font-extralight text-[#000000CC]'>{data?.shippingAddress?.name || 'N/A'}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Listing

const handleStatus = (status)=>{
  if(status === 'active') return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#DEF9D4] text-[#348352]`}>
      {status}
    </span>
  )
  else if(status === 'banned') return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F9D8D4] text-[#FF640F]`}>
      {status}
    </span>
  )
  else  return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F9EDD4] text-[#FF8911]`}>
      {status}
    </span>
  )
}