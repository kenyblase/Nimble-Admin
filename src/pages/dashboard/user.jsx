import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'
import ItemTabs from '../../components/ItemTabs'
import { useQueryClient } from '@tanstack/react-query'
import { useFetchUser } from '../../utils/useApis/useUserApis/useFetchUsers'
import StarRating from '../../components/StarRating'
import { useToggleUserStatus } from '../../utils/useApis/useUserApis/useToggleUserStatus'

const User = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [itemsActiveTab, setItemsActiveTab] = useState('Active')

    const {data, isLoading} = useFetchUser(id)

    const {toggleUserStatus} = useToggleUserStatus()

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
                        <p className='text-3xl font-bold text-[#202224]'>{data?.user?.firstName} {data?.user?.lastName}</p>
                    </div>
                </div>
                <div className='flex gap-6'>
                    <div onClick={async()=>{
                          await toggleUserStatus(id, 'suspended')
                        }} 
                        className='h-11 border border-[#3652AD] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                        <p className='text-[#3652AD] font-semibold text-base'>{data?.user?.status !== 'suspended' ? 'Suspend User' : 'Lift Suspension'}</p>
                    </div>
                    <div onClick={async()=>{
                          await toggleUserStatus(id, 'banned')
                        }} 
                        className='h-11 border border-[#3652AD] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                        <p className='text-[#3652AD] font-semibold text-base'>{data?.user?.status !== 'banned' ? 'Ban User' : 'Remove Ban'}</p>
                    </div>
                    <div onClick={() =>{
                          queryClient.setQueryData(["user", id], data);
                          navigate(`/users/${id}/edit`)
                        }}
                        className='h-11 bg-[#3652AD] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                        <p className='text-[#FEFEFF] font-semibold text-base'>Edit User Details</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <StarRating rating={data?.user?.averageRating}/>
                <p className='font-medium text-base text-[#202224CC]'>{data?.user?.numReviews} reviews</p>
              </div>
              <p className='font-medium text-base text-[#202224CC] cursor-pointer'>View Reviews</p>
            </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-center bg-[#FFFFFF] border border-[#0000000D] py-6 px-4'>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Name</p>
              <p className='font-medium text-base text-[#202224CC]'>{data?.user?.firstName} {data?.user?.lastName}</p>
            </div>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Phone</p>
              <p className='font-medium text-base text-[#202224CC]'>{data?.user?.phoneNumber || 'N/A'}</p>
            </div>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Email</p>
              <p className='font-medium text-base text-[#202224CC]'>{data?.user?.email}</p>
            </div>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Total Listing</p>
              <p className='font-medium text-base text-[#202224CC]'>{data?.totalListings}</p>
            </div>
          </div>
          <div className='flex justify-between items-center bg-[#FFFFFF] border border-[#0000000D] py-6 px-4'>
            <div className='flex flex-col gap-3'>
              <p className='font-medium text-base text-[#202224]'>UserID</p>
              <p className='font-medium text-base text-[#202224CC]'>{(data?.user?._id).toUpperCase()}</p>
            </div>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>IP Address</p>
              <p className='font-medium text-base text-[#202224CC]'>004:4743:583 <span className='underline text-[#FE7A36] cursor-pointer'>Block</span></p>
            </div>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Verification</p>
              {handleVerification(data?.user?.isVerified)}
            </div>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Status</p>
              <div className='bg-[#DEF9D4] text-center rounded-sm'>
                {handleStatus(data?.user?.status)}
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
            <h1 className='text-[#202224] text-3xl font-bold'>User Listing</h1>

            <div className='flex flex-col pb-10'>
                <ItemTabs ItemsTabs={itemsTabs} itemsActiveTab={itemsActiveTab} setItemsActiveTab={setItemsActiveTab}/>

            </div>
        </div>
    </div>
  )
}

export default User

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