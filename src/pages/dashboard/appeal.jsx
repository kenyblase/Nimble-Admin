import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useFetchAppeal } from '../../utils/useApis/useAppealApis/useFetchAppeals'
import { useToggleAppealStatus } from '../../utils/useApis/useAppealApis/useToggleAppealStatus'

const Appeal = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const {data, isLoading} = useFetchAppeal(id)

    const {toggleAppealStatus} = useToggleAppealStatus()

    if(isLoading) return <LoadingSpinner/>
  return (
    <div className='mt-7 mb-5 flex flex-col gap-7'>
        <div className='flex flex-col gap-6'>
            <div className='flex justify-between items-start'>
                <div className='flex flex-col gap-6'>
                    <div className='flex gap-2 items-center'>
                        <ArrowLeft onClick={()=>{navigate(-1)}} color='#FE7A36' size={32}/>
                        <p className='text-3xl font-bold text-[#202224]'>{data?.type ==='appeal' ?  `Appeal ${data._id}` : `Support Request ${data._id}`}</p>
                    </div>
                </div>
                <div className='flex gap-6'>
                    {data?.status !== 'open' && 
                    <div onClick={async()=>{
                          await toggleAppealStatus(id, 'open')
                        }} 
                        className='h-11 border border-[#3652AD] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                        <p className='text-[#3652AD] font-semibold text-base'>Open</p>
                    </div>
                    }
                    {data?.status !== 'closed' && 
                        <div onClick={async()=>{
                          await toggleAppealStatus(id, 'closed')
                        }} 
                        className='h-11 border border-[#3652AD] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                        <p className='text-[#3652AD] font-semibold text-base'>Close</p>
                    </div>
                    }
                    {data?.status !== 'resolved' && 
                        <div onClick={async()=>{
                          await toggleAppealStatus(id, 'resolved')
                        }} 
                        className='h-11 bg-[#3652AD] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                        <p className='text-[#FEFEFF] font-semibold text-base'>Mark as resolved</p>
                    </div>
                    }
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-center bg-[#FFFFFF] border border-[#0000000D] py-6 px-4'>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Appeal ID</p>
              <p className='font-medium text-base text-[#202224CC] max-w-30 truncate'>{data?._id} </p>
            </div>
            {data?.order &&
                <div className='flex flex-col gap-3 pr-8'>
                <p className='font-medium text-base text-[#202224]'>Order ID</p>
                <p className='font-medium text-base text-[#202224CC] max-w-30 truncate'>{data?.order}</p>
                </div>
            }
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Subject</p>
              <p className='font-medium text-base text-[#202224CC]'>{data?.subject}</p>
            </div>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>{data?.type ==='appeal' ?  `Buyer` : `User`}</p>
              <p className='font-medium text-base text-[#202224CC] max-w-30 truncate'>{data?.user?.firstName} {data?.user?.lastName}</p>
            </div>
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Date</p>
              <p className='font-medium text-base text-[#202224CC]'>{new Date(data?.createdAt).toLocaleDateString('en-GB')}</p>
            </div>
            {data?.seller &&
                <div className='flex flex-col gap-3 pr-8'>
                <p className='font-medium text-base text-[#202224]'>Seller</p>
                <p className='font-medium text-base text-[#202224CC] max-w-30 truncate'>{data?.seller?.firstName} {data?.seller?.lastName}</p>
                </div>
            }
            <div className='flex flex-col gap-3 pr-8'>
              <p className='font-medium text-base text-[#202224]'>Status</p>
              <div className='bg-[#DEF9D4] text-center rounded-sm'>
                {handleStatus(data?.status)}
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <p className='font-medium text-lg text-[#000000]'>Description</p>

          <p className='font-light text-base text-[#000000]'>{data?.description}</p>
        </div>

        {data?.attachments?.length > 0 &&
          <div className='flex flex-col gap-4'>
            <p className='font-medium text-lg text-[#000000]'>Images</p>

            <div className='flex flex-wrap gap-4'>
              {data.attachments.map((image)=>(
                <img src={image?.url} alt="appeal images" className='w-80 h-80 object-cover'/>
              ))}
            </div>
          </div>
        }
    </div>
  )
}

export default Appeal

const handleStatus = (status)=>{
  if(status === 'resolved') return (
    <span className={`w-fit text-sm font-medium flex items-center gap-1 py-1 px-3 rounded-lg bg-[#DEF9D4] text-[#348352]`}>
      {status}
    </span>
  )
  else if(status === 'closed') return (
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