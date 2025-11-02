import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useQueryClient } from '@tanstack/react-query'
import { useToggleUserStatus } from '../../utils/useApis/useUserApis/useToggleUserStatus'
import { useFetchOrder } from '../../utils/useApis/useOrderApis/useFetchOrders'
import { useEffect } from 'react'

const Order = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {data, isLoading} = useFetchOrder(id)

    const {toggleUserStatus} = useToggleUserStatus()

    useEffect(()=>{
      console.log(data.user)
    }, [])

    if(isLoading) return <LoadingSpinner/>
  return (
    <div className='mt-7 mb-5 flex flex-col gap-7'>
        <div className='flex flex-col gap-6'>
            <div className='flex justify-between items-start'>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-2 items-center'>
                        <ArrowLeft onClick={()=>{navigate(-1)}} color='#FE7A36' size={32}/>
                        <p className='text-3xl font-bold text-[#202224]'>order {(id).toUpperCase()}</p>
                    </div>
                </div>
                <div className='flex gap-6'>
                    <div onClick={async()=>{
                          await toggleUserStatus(id, 'suspended')
                        }} 
                        className='h-11 border border-[#B91C1C] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                        <p className='text-[#B91C1C] font-semibold text-base'>Cancel order</p>
                    </div>
                    <div onClick={() =>{
                          queryClient.setQueryData(["user", id], data);
                          navigate(`/users/${id}/edit`)
                        }}
                        className='h-11 bg-[#489766] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                        <p className='text-[#FEFEFF] font-semibold text-base'>Mark as completed</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-center bg-[#FFFFFF] border border-[#0000000D] py-6 px-4'>
            <div className='flex flex-col gap-3'>
              <p className='font-medium text-base text-[#202224]'>OrderID</p>
              <p className='font-medium text-base text-[#202224CC]'>{(data?._id).toUpperCase()}</p>
            </div>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Date</p>
              <p className='font-medium text-base text-[#202224CC]'>{formatDate(data?.createdAt)}</p>
            </div>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Seller</p>
              <p className='font-medium text-base text-[#202224CC]'>{data?.vendor?.firstName} {data?.vendor?.lastName}</p>
            </div>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Buyer</p>
              <p className='font-medium text-base text-[#202224CC]'>{data?.user?.firstName} {data?.user?.lastName}</p>
            </div>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Total</p>
              <p className='font-medium text-base text-[#202224CC]'>₦{(data?.totalAmount).toLocaleString()}</p>
            </div>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Commission</p>
              <p className='font-medium text-base text-[#202224CC]'>₦{(data?.commissionAmount).toLocaleString()}</p>
            </div>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Status</p>
              <div className='bg-[#DEF9D4] text-center rounded-sm'>
                {handleStatus(data?.transactionStatus)}
              </div>
            </div>
          </div>
        </div>

        <div className='flex gap-4'>
          <div className='flex flex-col gap-3 p-4 bg-[#FFFFFF] rounded-lg border border-[#0000000D] w-full'>
            <div className='flex flex-col gap-2'>
              <p className='text-sm text-[#000000CC] font-normal'>Shipping address</p>

              <div className='flex flex-col gap-0.5 pb-2'>
                <p className='text-sm text-[#00000099] font-light'>{data?.product?.shippingAddress?.name}</p>
                <p className='text-sm text-[#00000099] font-light'>{data?.product?.shippingAddress?.phoneNumber}</p>
                <p className='text-sm text-[#00000099] font-light'>{data?.product?.shippingAddress?.address},</p>
                <p className='text-sm text-[#00000099] font-light'>{data?.product?.shippingAddress?.city}, {data?.product?.shippingAddress?.state}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 p-4 bg-[#FFFFFF] rounded-lg border border-[#0000000D] w-full'>
            <div className='flex flex-col gap-2'>
              <p className='text-sm text-[#000000CC] font-normal'>Delivery address</p>

              <div className='flex flex-col gap-0.5 pb-2'>
                <p className='text-sm text-[#00000099] font-light'>{data?.deliveryAddress?.name}</p>
                <p className='text-sm text-[#00000099] font-light'>{data?.deliveryAddress?.phoneNumber}</p>
                <p className='text-sm text-[#00000099] font-light'>{data?.deliveryAddress?.address},</p>
                <p className='text-sm text-[#00000099] font-light'>{data?.deliveryAddress?.city}, {data?.product?.shippingAddress?.state}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 p-4 bg-[#FFFFFF] rounded-lg border border-[#0000000D] w-full'>
            <div className='flex flex-col jus gap-2'>
              <p className='text-sm text-[#000000CC] font-normal'>Payment Method</p>

              <div className='flex flex-col gap-0.5 pb-2'>
                <p className='text-sm text-[#00000099] font-light'>{data?.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Order

const handleStatus = (status)=>{
  if(status === 'completed') return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#DEF9D4] text-[#348352]`}>
      {status}
    </span>
  )
  else if(status === 'failed') return (
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
const handleVerification = (isVerified)=>{
  if(isVerified) return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#DEF9D4] text-[#348352]`}>
      Verified ID
    </span>
  )
  else return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#F9D8D4] text-[#FF640F]`}>
      Unverified ID
    </span>
  )
}

const formatDate = (date) => {
  if (!date) return '';

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

const formatStatus = (status) => {
  if (!status) return "active";

  const normalized = status.trim().toLowerCase();

  if (normalized === "review") return "pending";

  return normalized;
};