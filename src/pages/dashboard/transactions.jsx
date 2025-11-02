import { useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useEffect } from 'react'
import AnalyticsCard from '../../components/AnalyticsCard'
import { useGetLatestTransactions } from '../../utils/useApis/useDashboardApis/useGetLatestTransactions'
import RecentTransactionsTable from '../../components/RecentTransactionsTable'
import { useGetTransactionAnalytics } from '../../utils/useApis/useDashboardApis/useGetTransactionAnalytics'

const Transactions = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [itemsActiveTab, setItemsActiveTab] = useState('All')

  const { data:transactions, isLoading:isFetching} = useGetLatestTransactions(page, 10, formatStatus(itemsActiveTab), debouncedSearch);
  const {data:analytics, isLoading:loading} = useGetTransactionAnalytics()
  // Debounce search input (500ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const transactionAnalytics = [
    {
      title: "Total Pay-in",
      value: analytics?.payIn?.value,
      trendPercent: analytics?.payIn?.change,
      trendDirection: analytics?.payIn?.trend,
      trendLabel: analytics?.payIn?.duration,
    },
    {
      title: "Total Pay-out",
      value: analytics?.payOut?.value,
      trendPercent: analytics?.payOut?.change,
      trendDirection: analytics?.payOut?.trend,
      trendLabel: analytics?.payOut?.duration,
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
            transactionAnalytics.map((card, index)=>(
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