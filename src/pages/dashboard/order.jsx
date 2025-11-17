import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useQueryClient } from '@tanstack/react-query'
import { useFetchOrder } from '../../utils/useApis/useOrderApis/useFetchOrders'
import { useUpdateOrder } from '../../utils/useApis/useOrderApis/useUpdateOrder'

const Order = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const {data, isLoading} = useFetchOrder(id)

    const {cancelOrder, completeOrder} = useUpdateOrder()

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
                    {data?.orderStatus !== 'cancelled' && data?.transactionStatus !== 'failed' &&
                    <div onClick={async()=>{
                          await cancelOrder(id)
                        }} 
                        className='h-11 border border-[#B91C1C] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                        <p className='text-[#B91C1C] font-semibold text-base'>Cancel order</p>
                    </div>}
                   {data?.orderStatus !== 'delivered' && data?.transactionStatus !== 'completed' &&
                    <div onClick={async() =>{
                          await completeOrder(id)
                        }}
                        className='h-11 bg-[#489766] px-5 flex items-center justify-center rounded-full cursor-pointer'>
                        <p className='text-[#FEFEFF] font-semibold text-base'>Mark as completed</p>
                    </div>}
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
          <div className='flex flex-col rounded-lg gap-2 p-4 bg-[#FFFFFF] w-full'>
            <div className='flex flex-col rounded-sm gap-6 '>
              <p className='text-[#000000] text-sm font-normal'>Order</p>

              <div className='flex justify-between pb-2 border-b border-[#0000000D] rounded-sm'>
                <div className='flex gap-2 items-center'>
                  <div className='rounded-xs py-2 px-3 bg-[#F5F5F5]'>
                    <img src={data?.product?.images[0]} alt="product image" className='w-8 h-8 object-cover' />
                  </div>

                  <p className='text-[#140000] text-xs font-light'>{data?.product?.name}</p>
                </div>

                <p className='text-[#000000] font-medium text-sm'>₦{(data?.product?.price).toLocaleString()}</p>
              </div>
            </div>
            <div className='flex flex-col py-2 gap-4 rounded-sm'>
              <div className='flex justify-between pb-2 border-b border-[#0000000D]'>
                <p className='font-light text-base text-[#000000]'>Quantity:</p>

                <p className='text-[#000000] font-normal text-base'>{data?.quantity}</p>
              </div>
              <div className='flex justify-between pb-2 border-b border-[#0000000D]'>
                <p className='font-light text-base text-[#000000]'>Subtotal:</p>

                <p className='text-[#000000] font-bold text-base'>₦{(data?.totalAmount).toLocaleString()}</p>
              </div>
              <div className='flex justify-between pb-2 border-b border-[#0000000D]'>
                <p className='font-light text-base text-[#000000]'>Delivery:</p>

                <p className='text-[#000000] font-normal text-base'>{data?.deliveryFee > 0 ? data?.deliveryFee.toLocaleString() : 'free'}</p>
              </div>

              <div className='flex justify-between'>
                <p className='font-light text-base text-[#000000]'>Total:</p>

                <p className='text-[#000000] font-bold text-base'>₦{data?.deliveryFee ? (data?.totalAmount + data?.deliveryFee).toLocaleString() : data?.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col rounded-lg gap-6 p-4 bg-[#FFFFFF] w-full'>
            <p className='text-[#000000] text-sm font-normal'>Order status</p>

            <div className='flex flex-col justify-between'>
              <div className='flex gap-4 items-center'>
                <div>{activeCheck}</div>

                <div className='flex flex-col'>
                  <p className='text-xs text-[#000000] font-normal'>Order placed</p>

                  <p className='text-[10px] text-[#000000B2] font-light'>{formatDateLong(data?.createdAt)}</p>
                </div>
              </div>

              <div className='h-11.5 px-1.5 ml-[5px]'>
                <div className='border-l border-dashed border-[#00000080] h-full' />
              </div>

              <div className='flex gap-4 items-center'>
                {data?.orderStatus === 'shipped' || data?.orderStatus === 'delivered' ?
                <>
                  <div>{activeCheck}</div>

                  <div className='flex flex-col'>
                    <p className='text-xs text-[#000000] font-normal'>Order has been shipped</p>

                    <p className='text-[10px] text-[#000000B2] font-light'>{formatDateLong(data?.shippedAt)}</p>
                  </div>
                </>
                : 
                <>
                  <div>{inactiveCheck}</div>

                  <div className='flex flex-col'>
                    <p className='text-xs text-[#000000] font-normal'>Awaiting Shipping</p>
                  </div>
                </>
                }
              </div>

              <div className='h-11.5 px-1.5 ml-[5px]'>
                <div className='border-l border-dashed border-[#00000080] h-full' />
              </div>

              <div className='flex gap-4 items-center'>
                {data?.orderStatus === 'shipped' || data?.orderStatus === 'delivered' ?
                <>
                  <div>{activeCheck}</div>

                  <div className='flex flex-col'>
                    <p className='text-xs text-[#000000] font-normal'>Order has been Delivered</p>

                   { data?.deliveredAt && <p className='text-[10px] text-[#000000B2] font-light'>{ formatDateLong(data?.deliveredAt) }</p>}
                  </div>
                </>
                : 
                <>
                  <div>{inactiveCheck}</div>

                  <div className='flex flex-col'>
                    <p className='text-xs text-[#000000] font-normal'>Estimated delivery date</p>

                    <p className='text-[10px] text-[#000000B2] font-light'>{data?.expectedDeliveryDate ? formatDateLong(data?.expectedDeliveryDate) : 'N/A'}</p>
                  </div>
                </>
                }
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

const formatDate = (date) => {
  if (!date) return '';

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

const formatDateLong = (date) => {
  if (!date) return '';

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = d.toLocaleString('en-US', { month: 'short' }); // e.g. May
  const year = d.getFullYear();

  return `${day} ${month}, ${year}`;
};

const activeCheck = <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0L15.314 2.41754L19.4166 2.40997L20.6765 6.31386L24 8.71878L22.725 12.6176L24 16.5165L20.6765 18.9214L19.4166 22.8253L15.314 22.8177L12 25.2353L8.68598 22.8177L4.58336 22.8253L3.32348 18.9214L0 16.5165L1.27501 12.6176L0 8.71878L3.32348 6.31386L4.58336 2.40997L8.68598 2.41754L12 0Z" fill="#0DBA37"/>
<path d="M7.58398 12.6178L10.7384 15.7722L17.0472 9.46338" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

const inactiveCheck = <svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 0.5L15.814 2.91754L19.9166 2.90997L21.1765 6.81386L24.5 9.21878L23.225 13.1176L24.5 17.0165L21.1765 19.4214L19.9166 23.3253L15.814 23.3177L12.5 25.7353L9.18598 23.3177L5.08336 23.3253L3.82348 19.4214L0.5 17.0165L1.77501 13.1176L0.5 9.21878L3.82348 6.81386L5.08336 2.90997L9.18598 2.91754L12.5 0.5Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.08398 13.1178L11.2384 16.2722L17.5472 9.96338" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
