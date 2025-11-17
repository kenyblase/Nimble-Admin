import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchPayout } from '../../utils/useApis/usePayoutApis/useFetchPayouts'
import LoadingSpinner from '../../components/LoadingSpinner'
import { ArrowLeft, Edit } from 'lucide-react'

const Payout = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const {data, isLoading} = useFetchPayout(id)

  if(isLoading) return <LoadingSpinner/>
  return (
    <div className='mt-7 mb-5 flex flex-col gap-7'>
            <div className='flex flex-col gap-6'>
                <div className='flex justify-between items-start'>
                    <div className='flex flex-col gap-6'>
                        <div className='flex gap-2 items-center'>
                            <ArrowLeft onClick={()=>{navigate(-1)}} color='#FE7A36' size={32}/>
                            <p className='text-3xl font-bold text-[#202224]'>Payout Details - <span className='font-normal text-xl'>Order {(id).toUpperCase()}</span></p>
                        </div>
                    </div>
                    <div className='flex gap-6'>
                      <div  
                          onClick={() =>{ 

                          }}
                          className='bg-[#D3E4FE4D] size-11 border border-[#3652AD] rounded-full flex items-center justify-center cursor-pointer'>
                          <Edit color='#3652AD' size={20}/>
                      </div>
                      {
                        <div onClick={async()=>{
                            }} 
                            className='h-11 border border-[#B91C1C] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                            <p className='text-[#B91C1C] font-semibold text-base'>Reject</p>
                        </div>
                      }
                      {
                        <div onClick={async() =>{
                            }}
                            className='h-11 bg-[#489766] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                            <p className='text-[#FEFEFF] font-semibold text-base'>Approve</p>
                        </div>
                      }
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
                  <p className='font-medium text-base text-[#202224]'>Amount</p>
                  <p className='font-medium text-base text-[#202224CC]'>₦{data?.amount}</p>
                </div>
                <div className='flex flex-col gap-3 pr-8'>
                  <p className='font-medium text-base text-[#202224]'>Seller</p>
                  <p className='font-medium text-base text-[#202224CC]'>{data?.userId?.firstName} {data?.userId?.lastName}</p>
                </div>
                <div className='flex flex-col gap-3 pr-8'>
                  <p className='font-medium text-base text-[#202224]'>Date</p>
                  <p className='font-medium text-base text-[#202224CC]'>{formatDate(data?.createdAt)}</p>
                </div>
                <div className='flex flex-col gap-3 pr-8'>
                  <p className='font-medium text-base text-[#202224]'>Status</p>
                  <div className='bg-[#DEF9D4] text-center rounded-sm'>
                    {handleStatus(data?.status?.toLowerCase())}
                  </div>
                </div>
              </div>
            </div>

            {data?.note &&
              <div className='flex flex-col gap-4'>
                <p className='font-medium text-lg text-[#000000]'>Note</p>
                <p className='font-light text-base text-[#000000]'>{data?.note}</p>
              </div>
            }

        </div>
  )
}

export default Payout

const handleStatus = (status)=>{
  if(status === 'approved' || status === 'success') return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#DEF9D4] text-[#348352]`}>
      {status}
    </span>
  )
  else if(status === 'failed' || status === 'rejected') return (
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

const formatDate = (date) => {
  if (!date) return '';

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};