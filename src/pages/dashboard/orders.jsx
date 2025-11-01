import UsersTable from '../../components/UsersTable'
import { useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useEffect } from 'react'
import AnalyticsCard from '../../components/AnalyticsCard'
import ItemTabs from '../../components/ItemTabs'
import { useFetchUsers } from '../../utils/useApis/useUserApis/useFetchUsers'
import { useFetchUserAnalytics } from '../../utils/useApis/useUserApis/useFetchUserAnalytics'

const Orders = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [itemsActiveTab, setItemsActiveTab] = useState('All')

  const {data, isLoading} = useFetchUsers(page, 10, debouncedSearch, itemsActiveTab === 'All' ? '' : itemsActiveTab.toLowerCase())
  const {data:analytics, isLoading:loading} = useFetchUserAnalytics()
  // Debounce search input (500ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const userAnalytics = [
    {
      title: "Active Users",
      value: analytics?.activeUsers?.value,
      trendPercent: analytics?.activeUsers?.change,
      trendDirection: analytics?.activeUsers?.trend,
      trendLabel: analytics?.activeUsers?.duration,
    },
    {
      title: "Verified Users",
      value: analytics?.verifiedUsers?.value,
      trendPercent: analytics?.verifiedUsers?.change,
      trendDirection: analytics?.verifiedUsers?.trend,
      trendLabel: analytics?.verifiedUsers?.duration,
    },
    {
      title: "Suspended Users",
      value: analytics?.suspendedUsers?.value,
      trendPercent: analytics?.suspendedUsers?.change,
      trendDirection: analytics?.suspendedUsers?.trend,
      trendLabel: analytics?.suspendedUsers?.duration,
    },
    {
      title: "Banned Users",
      value: analytics?.bannedUsers?.value,
      trendPercent: analytics?.bannedUsers?.change,
      trendDirection: analytics?.bannedUsers?.trend,
      trendLabel: analytics?.bannedUsers?.duration,
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
            userAnalytics.map((card, index)=>(
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
          <UsersTable 
          users={data?.users} 
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