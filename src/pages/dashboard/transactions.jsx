import { useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useEffect } from 'react'
import AnalyticsCard from '../../components/AnalyticsCard'
import ItemTabs from '../../components/ItemTabs'
import { useFetchUserAnalytics } from '../../utils/useApis/useUserApis/useFetchUserAnalytics'
import { useGetLatestTransactions } from '../../utils/useApis/useDashboardApis/useGetLatestTransactions'
import RecentTransactionsTable from '../../components/RecentTransactionsTable'

const Transactions = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [itemsActiveTab, setItemsActiveTab] = useState('All')

  const { data:transactions, isLoading:isFetching} = useGetLatestTransactions(page, 10, formatStatus(itemsActiveTab), debouncedSearch);
  const {data:analytics, isLoading:loading} = useFetchUserAnalytics()
  // Debounce search input (500ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const userAnalytics = [
    {
      title: "Total Pay-in",
      value: analytics?.activeUsers?.value,
      trendPercent: analytics?.activeUsers?.change,
      trendDirection: analytics?.activeUsers?.trend,
      trendLabel: analytics?.activeUsers?.duration,
    },
    {
      title: "Total Pay-out",
      value: analytics?.verifiedUsers?.value,
      trendPercent: analytics?.verifiedUsers?.change,
      trendDirection: analytics?.verifiedUsers?.trend,
      trendLabel: analytics?.verifiedUsers?.duration,
    },
  ];

  const itemsTabs = [
    {label: 'All', count: 12, bgColor: 'bg-[#DEF9D4]', countColor: 'text-[#348352]'}, 
    {label: 'Successful', count: 12, bgColor: 'bg-[#C6C7F880]', countColor: 'text-[#3652AD]'}, 
    {label: 'Pending', count: 12, bgColor: 'bg-[#F9EDD4]', countColor: 'text-[#FF8911]'}, 
    {label: 'Failed', count: 12, bgColor: 'bg-[#F9D8D4]', countColor: 'text-[#E81008]'}, 
  ]

  return (
    <div className='mt-7 mb-5 flex flex-col gap-7'>
      <div className='h-11 flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-[#202224]'>Transactions</h1>
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
        {isFetching && !debouncedSearch ? 
          <div className='w-full h-80 flex items-center justify-center'>
            <div className='w-20 h-20'>
              <LoadingSpinner size={'size-full'}/>
            </div>
          </div>
        : 
        < div>
          <RecentTransactionsTable
           transactions={transactions?.data} 
           page={page} setPage={setPage} 
           totalPages={transactions?.pagination?.totalPages}
           isHomePage={false}
           itemsTabs={itemsTabs}
           itemsActiveTab={itemsActiveTab}
           setItemsActiveTab={setItemsActiveTab}
           search={search}
           setSearch={setSearch}
          />
        </div>
        }
      </div>
    </div>
  )
}

export default Transactions

const formatStatus = (status) => {
  if (!status) return "all";

  const normalized = status.trim().toLowerCase();

  return normalized;
};