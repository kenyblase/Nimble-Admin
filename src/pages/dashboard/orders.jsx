import UsersTable from '../../components/UsersTable'
import { useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useEffect } from 'react'
import AnalyticsCard from '../../components/AnalyticsCard'
import ItemTabs from '../../components/ItemTabs'
import { useFetchOrderAnalytics } from '../../utils/useApis/useOrderApis/useFetchOrderAnalytics'
import { useFetchOrders } from '../../utils/useApis/useOrderApis/useFetchOrders'
import OrdersTable from '../../components/OrdersTable'

const Orders = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [itemsActiveTab, setItemsActiveTab] = useState('All')

  const {data, isLoading} = useFetchOrders(page, 10, debouncedSearch, itemsActiveTab === 'All' ? '' : itemsActiveTab.toLowerCase())
  const {data:analytics, isLoading:loading} = useFetchOrderAnalytics()
  // Debounce search input (500ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const orderAnalytics = [
    {
      title: "Total Orders",
      value: analytics?.totalOrders?.value,
      trendPercent: analytics?.totalOrders?.change,
      trendDirection: analytics?.totalOrders?.trend,
      trendLabel: analytics?.totalOrders?.duration,
    },
    {
      title: "Completed Orders",
      value: analytics?.completedOrders?.value,
      trendPercent: analytics?.completedOrders?.change,
      trendDirection: analytics?.completedOrders?.trend,
      trendLabel: analytics?.completedOrders?.duration,
    },
    {
      title: "Pending Orders",
      value: analytics?.pendingOrders?.value,
      trendPercent: analytics?.pendingOrders?.change,
      trendDirection: analytics?.pendingOrders?.trend,
      trendLabel: analytics?.pendingOrders?.duration,
    },
  ];

  const itemsTabs = [
    {label: 'All', count: 12, bgColor: 'bg-[#DEF9D4]', countColor: 'text-[#348352]'}, 
    {label: 'Completed', count: 12, bgColor: 'bg-[#C6C7F880]', countColor: 'text-[#3652AD]'}, 
    {label: 'Pending', count: 12, bgColor: 'bg-[#F9EDD4]', countColor: 'text-[#FF8911]'}, 
    {label: 'Failed', count: 12, bgColor: 'bg-[#F9D8D4]', countColor: 'text-[#E81008]'}, 
  ]

  return (
    <div className='mt-7 mb-5 flex flex-col gap-7'>
      <div className='h-11 flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-[#202224]'>Orders</h1>
      </div>

      <div className='flex gap-8'>
          {loading? <div className='w-full flex justify-center items-center'>
                      <LoadingSpinner size='size-20'/> 
                    </div>
            :
            orderAnalytics.map((card, index)=>(
                  <AnalyticsCard key={index} {...card} />
            ))
          }
      </div>

      <div>
        {isLoading && !debouncedSearch ? 
          <div className='w-full h-80 flex items-center justify-center'>
            <div className='w-20 h-20'>
              <LoadingSpinner size={'size-full'}/>
            </div>
          </div>
        : 
        < div className='flex flex-col gap-4 p-6 bg-[#FFFFFF] border border-[#F2E9FF] rounded-2xl relative'>
          <ItemTabs ItemsTabs={itemsTabs} itemsActiveTab={itemsActiveTab} setItemsActiveTab={setItemsActiveTab}/>
          <OrdersTable 
          orders={data?.orders} 
          totalPages={data?.totalPages} 
          page={page} 
          setPage={setPage} 
          search={search} 
          setSearch={setSearch}
          />
        </div>
        }
      </div>
    </div>
  )
}

export default Orders